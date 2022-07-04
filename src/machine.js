import { createMachine, assign, actions } from 'xstate';

const { log, cancel, send } = actions;
// Action to increment the context amount
const addWater = assign({
  buffer: () => [],
  current: (context) => {
    return context.buffer.at(-1)
  }
});

const fetch = async (context, event) => {
  console.log('en fetch', context, event)
  return {data: 321} 
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
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                }
            }
          },
          error: {
            on: {
                TYPE: {
                    target: 'debouncing',
                    actions: "pushBuffer"
                }
            }
          },
          fetching: {
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
