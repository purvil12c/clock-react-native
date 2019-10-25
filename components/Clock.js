import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const degrees = [0, 90, 180, 360];
const clockBaseRadius = 100;
const clockBaseColor = '#0f0';

const clockFaceRadius = 175/2;
const clockFaceColor = '#f00';

class Clock extends React.Component {

  state = {
    hour: 12,
    minute: 0,
    second: 0,
  }

  componentDidMount(){
    this.clockInterval = setInterval(()=>{
      const time = new Date();
      this.setState({
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.clockInterval);
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.clockBase}>
          <View>
            {
              degrees.map(deg =>
                <View style={[styles.marker, {transform: [
                    {rotate: `${deg}deg`},
                    {translateX: 0}
                  ]}]}>
                </View>
              )
            }
            <View style={styles.clockFace}>
              <View style={[styles.secondHand, {transform: [{
                    rotate: `${this.state.second*6}deg`
                    },
                    {
                      translateY: clockFaceRadius/2
                    }
                ]
                }
              ]}>
              </View>
              <View style={[styles.hourHand, { transform: [{
                    rotate: `${this.state.hour*6}deg`
                    },
                    {
                      translateY: clockFaceRadius/4
                    },
                ]
                }
              ]}>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockBase: {
    width: clockBaseRadius*2,
    height: clockBaseRadius*2,
    backgroundColor: clockBaseColor,
    borderRadius: clockBaseRadius,
    borderWidth: 2,
    borderColor: '#000',
    position: 'relative',
  },
  marker: {
    width: 3,
    marginLeft: -3,
    height: clockBaseRadius*2,
    backgroundColor: '#fff',
    position: 'absolute',
    left: clockBaseRadius
  },
  clockFace: {
    width: clockFaceRadius*2,
    height: clockFaceRadius*2,
    position: 'absolute',
    backgroundColor: clockFaceColor,
    borderRadius: clockFaceRadius,
    alignSelf: 'center',
    marginTop: (clockBaseRadius - clockFaceRadius)
  },
  secondHand: {
    width: 1,
    height: clockFaceRadius,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: clockFaceRadius/2,
    position: 'absolute'
  },
  hourHand: {
    width: 5,
    height: clockFaceRadius/2,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: clockFaceRadius/2 + 20,
    position: 'absolute'
  }
});

export default Clock;
