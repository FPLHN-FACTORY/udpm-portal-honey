// import React, { Component } from "react";

// class ConfettiCanvas extends Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//     this.confetti = null;
//   }

//   componentDidMount() {
//     this.initializeConfetti();
//     this.startConfetti();
//     window.addEventListener("resize", this.resizeConfetti);
//   }

//   componentWillUnmount() {
//     this.stopConfetti();
//     window.removeEventListener("resize", this.resizeConfetti);
//   }

//   initializeConfetti() {
//     const canvas = this.canvasRef.current;
//     this.confetti = new ConfettiContext(canvas);
//     this.confetti.start();
//   }

//   startConfetti() {
//     this.confetti.start();
//   }

//   stopConfetti() {
//     this.confetti.stop();
//   }

//   resizeConfetti = () => {
//     this.confetti.resize();
//   };

//   render() {
//     return <canvas ref={this.canvasRef} id="confetti"></canvas>;
//   }
// }
// class ConfettiContext {
//   constructor(parent) {
//     this.canvasParent = parent;
//     this.canvas = document.createElement("canvas");
//     this.context = this.canvas.getContext("2d");
//     this.interval = null;
//     this.confettiRibbonCount = 7;
//     this.rpCount = 30;
//     this.rpDist = 8.0;
//     this.rpThick = 8.0;
//     this.confettiRibbons = new Array();
//     ConfettiRibbon.bounds = new Vector2(this.canvas.width, this.canvas.height);

//     for (let i = 0; i < this.confettiRibbonCount; i++) {
//       this.confettiRibbons[i] = new ConfettiRibbon(
//         Math.random() * this.canvas.width,
//         -Math.random() * this.canvas.height * 2,
//         this.rpCount,
//         this.rpDist,
//         this.rpThick,
//         45,
//         1,
//         0.05
//       );
//     }

//     const confettiPaperCount = 25;
//     const confettiPapers = new Array();
//     ConfettiPaper.bounds = new Vector2(this.canvas.width, this.canvas.height);

//     for (let i = 0; i < confettiPaperCount; i++) {
//       confettiPapers[i] = new ConfettiPaper(
//         Math.random() * this.canvas.width,
//         Math.random() * this.canvas.height
//       );
//     }

//     this.resize();
//   }

//   resize() {
//     this.canvas.width = this.canvasParent.offsetWidth;
//     this.canvas.height = this.canvasParent.offsetHeight;
//     ConfettiPaper.bounds = new Vector2(this.canvas.width, this.canvas.height);
//     ConfettiRibbon.bounds = new Vector2(this.canvas.width, this.canvas.height);
//   }

//   start() {
//     this.stop();
//     this.interval = setInterval(() => {
//       this.update();
//     }, 1000.0 / frameRate);
//   }

//   stop() {
//     clearInterval(this.interval);
//   }

//   update() {
//     for (let i = 0; i < confettiPaperCount; i++) {
//       confettiPapers[i].Update(dt);
//       confettiPapers[i].Draw(this.context);
//     }
//     for (let i = 0; i < this.confettiRibbonCount; i++) {
//       this.confettiRibbons[i].Update(dt);
//       this.confettiRibbons[i].Draw(this.context);
//     }
//   }
// }

// export default ConfettiContext;
