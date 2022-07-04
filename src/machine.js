import { createMachine, assign, actions } from 'xstate';
import { getRadiation } from './lib/radiation';

const { log, cancel, send } = actions;

const addWater = assign({
  buffer: () => [],
  current: (context) => {
    return context.buffer.at(-1)
  }
});

const fetch = async (context, event) => {
  const {lat, lng, azimut, angle} = event;
  console.log('fetching', {lat, lng, azimut, angle})
  return await getRadiation({lat, lng, azimut, angle})
}

const pushBuffer = assign((context, event)=>{
    return [...context.buffer, event.data]
})

function isBuffer(context){
    return context.buffer.length > 0
}

export default createMachine(
  {
    initial: 'home',
    context: {
        current: null,
        buffer: [{
            latitude: 0,
            longitude: 0
        }],
        radiation_result: null,
        result: null,
        errors: [""]
    },
    states: {
      home: {
        initial: 'initial',
        states: {
          radiationDone: {
            entry: log(),
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                }
            }
          },
          error: {
            entry: log(),
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                }
            }
          },
          fetching: {
            entry: log(),
            on:{
                TYPE: {
                    internal: true,
                    target: 'fetching',
                    actions: 'pushBuffer'
                }                
            },
            invoke: {
              src: fetch,
              onDone: {
                target: 'radiationDone'
              },
              onError: {
                target: 'error'
              }
            }
          },
          debouncing: {
            entry: [
                log(),
                cancel('debouncing'),
                send("FETCH", {
                    delay: 1000,
                    id: "debouncing"
                })
            ],
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                },
                FETCH: {
                    actions: "addWater",
                    target: 'fetching'
                }
            }
          },  
          initial: {
            entry: log(),
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                }
            },
            always: {
                cond: "isBuffer",
                target: "debouncing"
            },
          },
        }
      },
      results: {}
    }
  },
  {
    actions: { addWater, pushBuffer },
    guards: { isBuffer }
  }
);
