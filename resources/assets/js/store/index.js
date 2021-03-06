import '../bootstrap'

import Vuex from 'vuex'

Vue.use(Vuex)

function handleError (error) {
    switch (error.response.status) {
        case 401:
            window.location.href = '/login'
            break
    }
}

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
        currentInstruments: new Set([]),
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
        },
        addToCurrentInstruments: (state, name) => {
            state.currentInstruments.add(name)
        }
    },
    actions: {
        fetchMe ({ commit, state }, force = false) {
            return new Promise((resolve, reject) => {
                if (!force && state.me) {
                    resolve()
                } else {
                    axios.get('/api/users/0')
                        .then(response => {
                            commit('setMe', response.data)
                            resolve()
                        })
                        .catch(error => {
                            handleError(error)
                            reject(error)
                        })
                }
            })
        },
        updateMe ({ dispatch, commit, state }, data) {
            const changeInstrument = state.me.instrument !== data.instrument
            return new Promise((resolve, reject) => {
                axios.put('/api/users/' + state.me.id, data)
                    .then(response => {
                        dispatch('fetchMe', true).then(() => {
                            if (changeInstrument) {
                                dispatch('setupMidi', true).then(() => {
                                    resolve()
                                })
                            } else {
                                resolve()
                            }
                        })
                    })
                    .catch(error => {
                        handleError(error)
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
                            handleError(error)
                            reject(error)
                        })
                }
            })
        },
        fetchUsers ({ state }, params = { }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/users', { params: params })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        fetchLevel ({ state }, params = { }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/levels/find', { params: params })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
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
                            handleError(error)
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
                            handleError(error)
                            reject(error)
                        })
                }
            })
        },
        fetchDifficulty ({ state }, { gradeId, schoolId }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/gradeschool/' + gradeId + '/' + schoolId)
                    .then(response => {
                        resolve(response.data.difficulty)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        fetchUserBadges ({ state }, params = { }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/badgeuser', { params: params })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        fetchLevels ({ state }, params = { }) {
            return new Promise((resolve, reject) => {
                axios.get('/api/levels', { params: params })
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        storeGame ({ state }, data) {
            return new Promise((resolve, reject) => {
                axios.post('/api/games', data)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        updateGameUser ({ state }, { gameId, userId, data }) {
            return new Promise((resolve, reject) => {
                axios.put('/api/gameuser/' + gameId + '/' + userId, data)
                    .then(response => {
                        resolve()
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        finishGameUser ({ state }, { gameId, userId }) {
            return new Promise((resolve, reject) => {
                axios.put('/api/gameuser/' + gameId + '/' + userId + '/finish')
                    .then(response => {
                        resolve()
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        completeBadges ({ state }, userId) {
            return new Promise((resolve, reject) => {
                axios.put('/api/users/' + userId + '/complete')
                    .then(response => {
                        resolve()
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        generateQuestion ({ state }, data) {
            return new Promise((resolve, reject) => {
                axios.post('/api/questions/generate', data)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        storeAnswer ({ state }, data) {
            return new Promise((resolve, reject) => {
                axios.post('/api/answers', data)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        fetchGameStatistics ({ state }, id) {
            return new Promise((resolve, reject) => {
                axios.get('/api/games/' + id + '/statistics')
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        handleError(error)
                        reject(error)
                    })
            })
        },
        setupMidi ({ commit, state }, force = false) {
            return new Promise((resolve, reject) => {
                if (!force && state.midi) {
                    resolve()
                } else {
                    commit('addToCurrentInstruments', state.me.instrument)
                    const currentInstruments = [...state.currentInstruments]

                    MIDI.loadPlugin({
                        soundfontUrl: '/soundfonts/',
                        instruments: currentInstruments.map(name => state.instruments[name].soundfont),
                        targetFormat: 'mp3',
                        onsuccess: () => {
                            for (let name of currentInstruments) {
                                let instrument = state.instruments[name]
                                MIDI.setVolume(instrument.channel, 127)
                                MIDI.programChange(instrument.channel, MIDI.GM.byName[instrument.soundfont].number)
                            }
                            commit('setMidi', MIDI)
                            resolve()
                        }
                    })
                }
            })
        }
    }
})
