import React from 'react';
import {Parallax, ParallaxLayer} from 'react-spring/renderprops-addons';
import Showhide from './Showhide';
import {Simulation} from './Simulation';
import './Health.css';

const virusURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/220px-SARS-CoV-2_without_background.png';
const shipURL =
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-us-naval-hospital-ship-comfort-sits-docked-at-the-port-news-photo-1585323139.jpg?crop=0.668xw:1.00xh;0.00680xw,0&resize=980:*';

class Health extends React.Component {
  render() {
    const query = new URLSearchParams(window.location.search);
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={3}>
        <ParallaxLayer offset={0.15} speed={0.8}>
          <img
            src={virusURL}
            style={{
              display: 'block',
              width: '20%',
              marginLeft: '55%',
              position: 'absolute',
            }}
          />
          <ParallaxLayer offset={0.5} speed={1.2}>
            <img
              src={virusURL}
              style={{
                display: 'block',
                width: '10%',
                marginLeft: '15%',
                position: 'absolute',
              }}
            />
            <ParallaxLayer offset={2.1} speed={0.4}>
              <img
                src={virusURL}
                style={{
                  display: 'block',
                  width: '16%',
                  marginLeft: '80%',
                  position: 'absolute',
                }}
              />
            </ParallaxLayer>
          </ParallaxLayer>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.6}
          speed={0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <img
            src={shipURL}
            style={{
              width: '75%',
              borderRadius: '20px 0px 0px 20px',
              position: 'relative',
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer
          offset={-0.01}
          speed={0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <a
            style={{position: 'absolute', marginBottom: 50}}
            onClick={() => this.parallax.scrollTo(1)}
          >
            <button>HELP</button>
          </a>
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.1}
          speed={0.2}
          style={{
            display: 'flex',
            alignItems: 'right',
            justifyContent: 'center',
          }}
        >
          <a onClick={() => this.parallax.scrollTo(2)}>
            <button>SIMULATION</button>
          </a>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            alignItems: 'right',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <a id="top" onClick={() => this.parallax.scrollTo(0)}>
            <div>
              <div>^^</div>
              <div>go back to the top</div>
            </div>
          </a>

          <Simulation
            cx={400}
            cy={200}
            width={400}
            height={300}
            defaultMortality={query.get('mortality') || 4}
            defaultVirality={query.get('virality') || 50}
            defaultLengthOfInfection={query.get('lengthOfInfection') || 40}
            defaultSocialDistancing={query.get('socialDistancing') || 0}
            defaultReinfectability={query.get('reinfectability') || 30}
          />
          <h6>
            <small>Credit: Swizec Teller</small>
          </h6>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.7}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '8%',
          }}
        >
          <Showhide />
        </ParallaxLayer>
      </Parallax>
    );
  }
}

export default Health;
