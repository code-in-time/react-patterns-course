import React, { Component, useState } from 'react'
import styles from './index.css'
import mojs from 'mo-js'

/**
 * HOC
 */

const withClapAnimation = WrappedComponent => {

  class WithClapAnimation extends Component {

    animationTimeline = new mojs.Timeline()
    state = {
      // animate: () => {
      //   console.log('%c Animate', 'background: red; color: #000')
      // }
      animationTimeline: this.animationTimeline
    }

    componentDidMount() {
      const tlDuration = 300
      const scaleButton = new mojs.Html({
        el: '#clap',
        duration: tlDuration,
        scale: {1.3: 1},
        easing: mojs.easing.ease.out
      });

      const countTotalAnimation = new mojs.Html({
        el: '#clapCountTotal',
        opacity: {0: 1},
        delay: (3 * tlDuration) / 2,
        duration: tlDuration,
        y: { 0: -3 }

      });

      const clap = document.getElementById('clap')
      clap.style.transform = 'scale(1,1)'

      const newAnimationTimeline = this.animationTimeline.add([scaleButton, countTotalAnimation])
      this.setState({animationTimeline: newAnimationTimeline})
    }

    render () {
      return <WrappedComponent {...this.props} animationTimeline={this.state.animationTimeline} />
    }
  }
  return WithClapAnimation
}

/**
 * The medium clap function
 * @param {object} props a reference to a function
 */
const MediumClap = ({animationTimeline}) => {
  const MAX_USER_CLAP = 12
  const initState = {
    count: 0,
    countTotal: 267,
    isClicked: false
  }
  const [clapState, setClapState] = useState(initState)
  const { count, countTotal, isClicked } = clapState

  const clapBtnHandler = e => {

    animationTimeline.replay()
    console.log(animationTimeline)
    setClapState(prevState => ({
      isClicked: true,
      count: Math.min(prevState.count + 1, MAX_USER_CLAP),
      countTotal: count < MAX_USER_CLAP ? prevState.countTotal + 1 : prevState.countTotal
    }))
  }

  return (
    <button id="clap" className={styles.clap} onClick={clapBtnHandler}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} />
      <ClapTotal countTotal={countTotal} />
    </button>
  )
}

const ClapIcon = ({ isClicked }) => {
  return <span>
    <svg className={`${styles.icon} ${isClicked && styles.checked}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150"><path d="M83.7 26.6c-.7 0-1.5.1-2.1.3v-1c0-4.1-3.3-7.5-7.5-7.5-.7 0-1.5.1-2.1.3v-1c0-4.1-3.3-7.5-7.5-7.5S57 13.5 57 17.7v1c-.7-.2-1.4-.3-2.1-.3-4.1 0-7.5 3.3-7.5 7.5v16.4c0 6.5-.4 13.1-1.3 19.6l-1-2.2c-1-2.2-3.5-8-10.8-7.5h-.2c-2 .1-3.8 1.3-4.7 3.1-.9 1.7-.8 3.8.2 5.4 1.6 2.6 3.1 7.7 3.8 11.2l.8 4.3c.7 3.9 2.3 7.6 4.7 10.8 0 .1.1.1.2.2l7.7 8.7c1.5 1.7 2.4 4 2.4 6.3v5.3c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7v-5.3c0-3.6-1.3-7.1-3.7-9.8l-7.7-8.6c-1.8-2.5-3.1-5.5-3.7-8.5l-.9-4.3c-.7-3.9-2.5-9.6-4.5-13 0-.1-.1-.1 0-.2s.2-.2.4-.3h.2c2.8-.2 4.1.8 5.6 4.3l4.6 10.5s0 .1.1.1c.1.1.1.2.2.4 0 .1.1.1.2.2l.2.2.2.2.2.2c.1 0 .2.1.2.1.1 0 .1.1.2.1.2.1.3.1.5.1h1.2c.1 0 .2-.1.3-.1h.1s.1 0 .1-.1c.1 0 .2-.1.3-.2.1 0 .1-.1.2-.1.1-.1.2-.1.2-.2l.1-.1c.1-.1.1-.2.2-.3l.1-.1c.1-.1.1-.2.2-.4v-.1c.1-.2.1-.3.1-.5 1.8-9.7 2.8-19.6 2.8-29.5V25.9c0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1v27.2c0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7V17.8c0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1v35.3c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V25.9c0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1v27.2c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V34c0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1v38.9c0 5.2-1.3 10.4-3.8 15.1-3.2 6-4.9 12.8-4.9 19.6v.2c0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7v-.2c0-5.9 1.5-11.8 4.3-17.1 2.9-5.4 4.4-11.5 4.4-17.6V34c0-4.1-3.4-7.4-7.5-7.4z" /><text y="135" fontSize="5" fontWeight="bold" fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Symbolon</text><text y="140" fontSize="5" fontWeight="bold" fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>

  </ span>
};

const ClapCount = ({ count }) => {
  return <span className={styles.count}>+ {count}</ span>
};

const ClapTotal = ({ countTotal }) => {
  return <span id="clapCountTotal" className={styles.total}>{countTotal}</ span>
};



/**
  Usage
*/
const Usage = () => {
  const AnimatedMediumClap = withClapAnimation(MediumClap)
  return <AnimatedMediumClap />
}

export default Usage
