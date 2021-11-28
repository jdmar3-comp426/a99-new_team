import React, { Component } from "react";
import wavurl from '../assets/audio_move.wav'
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
import Chessboard from "chessboardjsx";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";
const socket = require("../connect/clientSocket.js").sock;



class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };
  constructor(props){
    super(props);
    this.state = {
      gameId: props.gameId,
      fen: "start",
      // square styles for active drop square
      dropSquareStyle: {},
      // custom square styles
      squareStyles: {},
      // square with the currently clicked piece
      pieceSquare: "",
      // currently clicked square
      square: "",
      // array of past game moves
      history: [],
      updateDatabase: false,
      gameOver: false,
      result: 'ongoing'
    };
  }

  componentDidUpdate(prevprops, prevState){
    if(prevState.updateDatabase===false && this.state.updateDatabase===true){
      console.log('updating database')
      var update={'eloRating':7,'winsAsWhite':0,'winsAsBlack':0, 'lossesAsWhite':0,
                    'lossesAsBlack':0, 'drawsAsWhite':0, 'drawsAsBlack':0};
      if(this.state.result==='YOU LOSE!'){
        update.eloRating=-7;
        if(this.props.orientation==='white')
          update.lossesAsWhite='1';
        else
          update.lossesAsBlack='1';
      }
      else if(this.state.result==='YOU WIN!'){
        update.eloRating=7;
        if(this.props.orientation==='white')
          update.winsAsWhite='1';
        else
          update.winsAsBlack='1';
      }
      else{
        update.eloRating=2;
        if(this.props.orientation==='white')
          update.drawsAsWhite='1';
        else
          update.drawsAsBlack='1';
      }
      
        const handleUpdate= async () =>{
          try {
            const res=await axios.patch('http://localhost:5000/app/updateUserData/'+this.props.playerNames.myName,update);
            console.log(res.data);

          } catch (error) {
            console.log(error);
            console.log('could not update user records');
          }
        };
        handleUpdate();
      
    }
  }

  componentDidMount() {
    console.log(this.props.playerNames);
    this.game = new Chess();
    this.audio= new Audio(wavurl);
    //this.audio.play();
    socket.on("opponent move", (oppMove)=>{
      this.game.move({from: oppMove.move.from, to:oppMove.move.to, promotion:oppMove.move.promotion});
      this.setState({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        pieceSquare: ""
      },()=>{this.audio.play();});

      if(this.game.game_over() && (this.game.in_draw() || this.game.in_stalemate()|| this.game.in_threefold_repetition() ||this.game.insufficient_material())){
        this.setState({result:'DRAW!',gameOver:true,updateDatabase:true});
      }
  
      else if(this.game.game_over() && this.game.in_checkmate() && this.props.orientation[0].toLowerCase()===(this.game.history({verbose:true})[this.game.history.length-1]).color){
        this.setState({result:'YOU WIN!',gameOver:true,updateDatabase:true});
      }
  
      else if(this.game.game_over() && this.game.in_checkmate()){
        this.setState({result:'YOU LOSE!',gameOver:true,updateDatabase:true});
      }
    });
  }

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  // show possible moves
  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    if (this.game.turn() !== this.props.orientation[0].toLowerCase()) {
      return;
    }
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }),()=>{this.audio.play();});

    socket.emit("new move", {move:move, gameId:this.state.gameId}); 
    if(this.game.game_over() && (this.game.in_draw() || this.game.in_stalemate()|| this.game.in_threefold_repetition() ||this.game.insufficient_material())){
      this.setState({result:'DRAW!',gameOver:true,updateDatabase:true});
    }

    else if(this.game.game_over() && this.game.in_checkmate() && this.props.orientation[0].toLowerCase()===(this.game.history({verbose:true})[this.game.history.length-1]).color){
      this.setState({result:'YOU WIN!',gameOver:true,updateDatabase:true});
    }

    else if(this.game.game_over() && this.game.in_checkmate()){
      this.setState({result:'YOU LOSE!',gameOver:true,updateDatabase:true});
    }
  };

  onMouseOverSquare = (square) => {
    // get list of possible moves for this square
    if (this.game.turn() !== this.props.orientation[0].toLowerCase()) {
      return;
    }
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = (square) => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = (square) => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 0, 0)" }
    });
  };

  onSquareClick = (square) => {
    if (this.game.turn() !== this.props.orientation[0].toLowerCase()) {
      return;
    }
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    var move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    },()=>{this.audio.play()});
    socket.emit("new move", {move:move, gameId:this.state.gameId});
    if(this.game.game_over() && (this.game.in_draw() || this.game.in_stalemate()|| this.game.in_threefold_repetition() ||this.game.insufficient_material())){
      this.setState({result:'DRAW!',gameOver:true,updateDatabase:true});
    }

    else if(this.game.game_over() && this.game.in_checkmate() && this.props.orientation[0].toLowerCase()===(this.game.history({verbose:true})[this.game.history.length-1]).color){
      this.setState({result:'YOU WIN!',gameOver:true,updateDatabase:true});
    }

    else if(this.game.game_over() && this.game.in_checkmate()){
      this.setState({result:'YOU LOSE!',gameOver:true,updateDatabase:true});
    }   
  };

  onSquareRightClick = (square) =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  render() {
    //console.log(this.state);
    const { fen, dropSquareStyle, squareStyles } = this.state;
    return (<React.Fragment>
      <Modal open={this.state.gameOver} size="large"> 
        <Modal.Header style={{ textAlign: 'center'}}>Game Over!</Modal.Header>
          <Modal.Content style={{ textAlign: 'center'}}>
              <p>
                {this.state.result}
              </p>
          </Modal.Content>
          <Modal.Actions style={{ textAlign: 'center'}}>
            <Button color="green" onClick={event => window.location.href='/private-dashboard'}>Return to Dashboard</Button>
          </Modal.Actions>
      </Modal>
      {this.props.children({
      squareStyles,
      orientation:this.props.orientation,
      position: fen,
      onMouseOverSquare: this.onMouseOverSquare,
      onMouseOutSquare: this.onMouseOutSquare,
      onDrop: this.onDrop,
      dropSquareStyle,
      onDragOverSquare: this.onDragOverSquare,
      onSquareClick: this.onSquareClick,
      onSquareRightClick: this.onSquareRightClick
    })} 
    </React.Fragment>);
  }
}

export default function WithMoveValidation(props) {
  console.log(props.playerNames);
  return (
    <div>
      <HumanVsHuman orientation={props.orientation} gameId ={props.gameId} playerNames={props.playerNames}>
        {({
          orientation,
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={500}
            orientation={orientation}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};
