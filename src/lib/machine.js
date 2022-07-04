import { createMachine, assign, actions } from 'xstate';
import { getRadiation } from './lib/radiation';

const { log, cancel, send } = actions;

const cleanBufferAndSetCurrent = assign({
  buffer: () => [],
  current: (context) => context.buffer.at(-1)
});

const fetch = async (context, event) => {
  const {lat, lng, azimut, angle} = event;
  console.log('fetching', event, {lat, lng, azimut, angle})
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
        buffer: [],
        radiation_result: null,
        result: null,
        error: ""
    },
    states: {
      home: {
        initial: 'initial',
        on: {
          CALCULATE: 'results'
        },
        states: {
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
                    actions: "cleanBufferAndSetCurrent",
                    target: 'fetching'
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
                actions: assign({error: (_, event) => "Error en invoke fetch radiation: " + JSON.stringify(event)})
                target: 'error'
              }
            }
          },
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
          }
        }
      },
      results: {}
    }
  },
  {
    actions: { cleanBufferAndSetCurrent, pushBuffer },
    guards: { isBuffer }
  }
);
