import '../bootstrap'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        me: null,
        schools: null,
        grades: null,
        instruments: {
            clarinet: {
                channel: 0,
                soundfont: 'clarinet'
            },
            guitar: {
                channel: 1,
                soundfont: 'acoustic_guitar_nylon'
            },
            piano: {
                channel: 2,
                soundfont: 'acoustic_grand_piano'
            },
            trumpet: {
                channel: 3,
                soundfont: 'trumpet'
            },
            violin: {
                channel: 4,
                soundfont: 'violin'
            }
        },
        midi: null
    },
    getters: {
        getInstrumentChannel: (state) => (name) => {
            return state.instruments[name].channel
        }
    },
    mutations: {
        setMe: (state, me) => {
            state.me = me
        },
        setSchools: (state, schools) => {
            state.schools = schools
        },
        setGrades: (state, grades) => {
            state.grades = grades
        },
        setMidi: (state, midi) => {
            state.midi = midi
        }
    },
    actions: {
        fetchMe ({ commit, state }, force = false) {
            return new Promise((resolve, reject) => {
                if (!force && state.me) {
                    resolve()
                } else {
                    axios.get('/api/me')
                        .then(response => {
                            commit('setMe', response.data)
                            resolve()
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
        },
        storeMe ({ dispatch, commit, state }, data) {
            return new Promise((resolve, reject) => {
                axios.put('/api/users/' + state.me.id, data)
                    .then(response => {
                        dispatch('fetchMe', true)
                        resolve()
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        },
        fetchUser ({ state }, id) {
            return new Promise((resolve, reject) => {
                if (state.me && state.me.id === id) {
                    resolve(state.me)
                } else {
                    axios.get('/api/users/' + id)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
        },
        fetchSchools ({ commit, state }, force = false) {
            return new Promise((resolve, reject) => {
                if (!force && state.schools) {
                    resolve()
                } else {
                    axios.get('/api/schools', { params: { per_page: 0 } })
                        .then(response => {
                            commit('setSchools', response.data)
                            resolve()
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
        },
        fetchGrades ({ commit, state }, force = false) {
            return new Promise((resolve, reject) => {
                if (!force && state.grades) {
                    resolve()
                } else {
                    axios.get('/api/grades', { params: { per_page: 0 } })
                        .then(response => {
                            commit('setGrades', response.data)
                            resolve()
                        })
                        .catch(error => {
                            console.log(error)
                            reject(error)
                        })
                }
            })
        },
        setupMidi ({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.midi) {
                    resolve()
                }
                MIDI.loadPlugin({
                    soundfontUrl: '/soundfonts/',
                    instruments: Object.keys(state.instruments).map(name => state.instruments[name].soundfont),
                    onsuccess: () => {
                        for (let name in state.instruments) {
                            let instrument = state.instruments[name]
                            MIDI.setVolume(instrument.channel, 127)
                            MIDI.programChange(instrument.channel, MIDI.GM.byName[instrument.soundfont].number)
                        }
                        commit('setMidi', MIDI)
                        resolve()
                    }
                })
            })
        }
    }
})
