<style lang="scss" scoped>
@import '../../sass/variables/index';

.intervals {
    width          : 100%;
    height         : 100vh;
    padding-bottom : 44px;

    @include breakpoint-landscape { position: relative; }
}

.intervals__instructions {
    padding        : 20px 0;
    display        : flex;
    align-items    : center;
    flex-direction : column;
}

.intervals__instructions-list-item { padding: 8px 20px 8px 3px; }

.intervals__logic {
    display: flex;

    @include breakpoint-portrait { display: block; }
}

.intervals__stave-keyboard-wrapper {
    width      : 65vw;
    margin-top : 10px;
    padding    : 0 2.5vw;

    @include breakpoint-portrait { margin-top: 0; }
}

.intervals__stave { margin-bottom: 5px; }

.intervals__commands {
    width           : 35vw;
    padding         : 0 2.5vw;
    display         : flex;
    justify-content : space-evenly;
    align-items     : center;
    flex-direction  : column;

    @include breakpoint-portrait {
        width          : 100vw;
        margin-top     : 10px;
        padding        : 0;
        flex-direction : row;
    }

    @include breakpoint-small-phone-landscape { padding-bottom: 25px; }
    @include breakpoint-large-phone-landscape { padding-bottom: 20px; }
}

.intervals__state {
    padding : 0 2.5vw;
    display : flex;

    @include breakpoint-portrait {
        padding-top : 25px;
        display     : block;
    }
}

.intervals__progress-wrapper {
    width           : 77.5vw;
    height          : 65px;
    display         : flex;
    justify-content : space-between;
    align-items     : center;

    @include breakpoint-portrait {
        width           : 100%;
        height          : auto;
        padding-right   : 0;
        justify-content : space-evenly;
        flex-direction  : column;
    }
}

.intervals__progress-chapters {
    width   : 40vw;
    display : flex;

    @include breakpoint-portrait {
        width          : 100%;
        padding-bottom : 10px;
    }
}

.intervals__progress-chapter {
    position         : relative;
    width            : calc((100vw - 4vw) / 3);
    height           : 20px;
    background-color : $moss-green;

    &:first-child {
        margin-right  : 2vw;
        border-radius : 10px 0 0 10px;

        .intervals__progress-question { border-radius: 10px 0 0 10px; }
    }

    &:last-child {
        margin-left   : 2vw;
        border-radius : 0 10px 10px 0;
    }

    @include breakpoint-portrait { width: calc((100% - 4vw) / 3); }
}

.intervals__progress-question {
    position         : absolute;
    height           : 20px;
    background-color : $fern;
}

.intervals__notification-label {
    height       : 45px;
    display      : flex;
    align-items  : center;
    text-align   : center;
    color        : $cabaret;
    font-size    : 17px;
}

.intervals__timer {
    position : absolute;
    right    : 2.5vw;
    bottom   : 45px;

    @include breakpoint-portrait { position: unset; }
    @include breakpoint-tablet-landscape { position: unset; }
}
</style>

<!-- override -->
<style lang="scss">
@import '../../sass/variables/index';

.intervals__instructions .button {
    margin: 30px 0 40px 0;

    .button__full { background-color: $sea-green; }
}
.intervals__command--delete .button {
    @include breakpoint-small-phone {
        width  : 100px !important;
        height : 50px !important;

        .button__hollow { font-size: 11px; }
    }

    @include breakpoint-phone {
        width  : 100px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-large-phone {
        width  : 100px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-tablet {
        width  : 150px !important;
        height : 60px !important;

        .button__hollow { font-size: 15px; }
    }

    @include breakpoint-landscape {
        width  : 130px !important;
        height : 40px !important;
    }

    @include breakpoint-tablet-landscape {
        width  : 175px !important;
        height : 50px !important;
    }

    .button__full { background-color: $jaffa; }
    .button__hollow { padding: 2px; }
}
.intervals__command--replay .button {
    @include breakpoint-small-phone {
        width  : 100px !important;
        height : 50px !important;

        .button__hollow { font-size: 11px; }
    }

    @include breakpoint-phone {
        width  : 115px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-large-phone {
        width  : 115px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-tablet {
        width  : 150px !important;
        height : 60px !important;

        .button__hollow { font-size: 15px; }
    }

    @include breakpoint-landscape {
        width  : 130px !important;
        height : 40px !important;
    }

    @include breakpoint-tablet-landscape {
        width  : 175px !important;
        height : 50px !important;
    }

    .button__full { background-color: $jaffa; }
    .button__hollow { padding: 2px; }
}
.intervals__command--next .button {
    @include breakpoint-small-phone {
        width  : 90px !important;
        height : 50px !important;

        .button__hollow { font-size: 11px; }
    }

    @include breakpoint-phone {
        width  : 100px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-large-phone {
        width  : 100px !important;
        height : 60px !important;

        .button__hollow { font-size: 13px; }
    }

    @include breakpoint-tablet {
        width  : 150px !important;
        height : 60px !important;

        .button__hollow { font-size: 15px; }
    }

    @include breakpoint-landscape {
        width  : 130px !important;
        height : 40px !important;
    }

    @include breakpoint-tablet-landscape {
        width  : 175px !important;
        height : 50px !important;
    }

    .button__full { background-color: $fern; }
    .button__hollow { padding: 2px; }
}
</style>

<template>
    <div class="intervals">
        <loader v-show="loading"></loader>
        <div class="intervals__instructions" v-show="!loading && instructing">
            <element-button text="začni" @click.native="startGame()"></element-button>
            <ul class="intervals__instructions-list">
                <li class="intervals__instructions-list-item">Preizkusil se boš v igri ugotavljanja intervalov.</li>
                <li class="intervals__instructions-list-item">Igra je razdeljena v 3 poglavja, vsako izmed njih ima 8 vprašanj.</li>
                <li class="intervals__instructions-list-item">Za odgovor na posamezno vprašanje imaš na voljo natanko 120 sekund.</li>
                <li class="intervals__instructions-list-item">Število odgovorov na posamezno vprašanje je omejeno.</li>
                <li class="intervals__instructions-list-item">Za vnos not na notno črtovje uporabi klaviaturo.</li>
                <li class="intervals__instructions-list-item">Na voljo imaš še ukaz za brisanje not, ponovno predvajanje tonov in premik na naslednje vprašanje.</li>
                <li class="intervals__instructions-list-item">Če bo tvoj odgovor napačen, se ti bo izpisalo obvestilo.</li>
                <li class="intervals__instructions-list-item" v-show="!isPractice">Uspešnost reševanja nalog bo vplivala na tvoj položaj na lestvici.</li>
                <li class="intervals__instructions-list-item">Na koncu igre si lahko ogledaš statistiko.</li>
            </ul>
        </div>
        <div v-show="!loading && !instructing">
            <label style="padding-left: 10px" v-show="debug">{{ sample.join(',') }} | {{ answer.map(a => a.pitch).join(',') }}</label>
            <div class="intervals__logic">
                <div class="intervals__stave-keyboard-wrapper">
                    <div class="intervals__stave">
                        <stave :n-notes="sample.length" :note-type="notes.type" :clef="notes.clef" :sharp-flat-map="sharpFlatMap" @notes-changed="notesChanged"></stave>
                    </div>
                    <keyboard :channel="channel" :midi="midi" @note-played="addNote" @key-pressed="keyPressed"></keyboard>
                </div>
                <div class="intervals__commands">
                    <div class="intervals__command--delete">
                        <element-button text="izbriši noto" :disable="answer.length <= 1" @click.native="removeNote()"></element-button>
                    </div>
                    <div class="intervals__command--replay">
                        <element-button text="predvajaj" @click.native="playNotes()" v-show="!playing"></element-button>
                        <element-button text="ustavi" @click.native="stopNotes()" v-show="playing"></element-button>
                    </div>
                    <div class="intervals__command--next">
                        <element-button :text="'naprej (' + (maxAnswersPerQuestion - nAnswers) + ')'" :disable="playing" @click.native="checkCorrectness()"></element-button>
                    </div>
                </div>
            </div>
            <div class="intervals__state">
                <div class="intervals__progress-wrapper">
                    <div class="intervals__progress-chapters">
                        <div class="intervals__progress-chapter" v-for="n in nChapters">
                            <div class="intervals__progress-question" :style="{ 'width': (chapter > n ? 100 : ((number - 1) * 100 / nQuestions)) + '%' }" v-show="chapter >= n"></div>
                        </div>
                    </div>
                    <label class="intervals__notification-label">{{ notification }}</label>
                    <svg class="intervals__timer" id="timer"></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: ['game', 'difficulty'],
    data () {
        return {
            loading: true,
            instructing: false,
            playing: false,
            playingTimeoutId: null,
            noteTimeoutIds: [],
            debug: false,
            notes: {
                type: 'whole',
                delay: 0,
                min: 0,
                max: 0,
                clef: ''
            },
            channel: 0,
            sharpFlatMap: {
                'A#3': 'Bb3',
                'Bb3': 'A#3',
                'C#4': 'Db4',
                'Db4': 'C#4',
                'D#4': 'Eb4',
                'Eb4': 'D#4',
                'F#4': 'Gb4',
                'Gb4': 'F#4',
                'G#4': 'Ab4',
                'Ab4': 'G#4',
                'A#4': 'Bb4',
                'Bb4': 'A#4',
                'C#5': 'Db5',
                'Db5': 'C#5'
            },
            nChapters: 3,
            nQuestions: 8,
            maxTimePerQuestion: 120000,
            nAnswers: 0,
            maxAnswersPerQuestion: 0,
            timer: null,
            chapter: 1,
            number: 1,
            questionId: 0,
            sample: [],
            answer: [],
            startTime: 0,
            timeoutId: 0,
            nAdditions: 0,
            nDeletions: 0,
            nPlaybacks: 0,
            notification: ''
        }
    },
    created () {
        if (!this.game || !this.difficulty) {
            this.$router.push({ name: 'dashboard' })
        } else {
            if (this.difficulty.range <= 3) {
                this.maxAnswersPerQuestion = 2
            } else if (this.difficulty.range <= 5) {
                this.maxAnswersPerQuestion = 3
            } else if (this.difficulty.range <= 8) {
                this.maxAnswersPerQuestion = 4
            } else {
                this.maxAnswersPerQuestion = 5
            }

            this.fetchMe().then(() => {
                this.notes.delay = this.me.note_playback_delay
                this.notes.clef = this.me.clef
                this.channel = this.getInstrumentChannel(this.me.instrument)

                this.setupMidi().then(() => {
                    this.generateQuestion({ game_id: this.game.id, chapter: this.chapter, number: this.number }).then((question) => {
                        this.questionId = question.id
                        this.sample = question.content.split(',')
                        this.$nextTick(() => this.addNote(this.sample[0]))
                        this.loading = false
                        this.instructing = true
                    })
                })
            })
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.timer = new TimerProgress({ // eslint-disable-line no-undef
                'container': this.$el.querySelector('#timer'),
                'width-container': 80,
                'height-container': 80,
                'stroke-width': 10,
                'color-circle': '#F8A16E',
                'color-path': '#EB7D3D',
                'color-alert': '#D2495F',
                'font-size': 20,
                'font-family': 'GothamRounded-Bold'
            })
        })
    },
    beforeDestroy () {
        clearTimeout(this.timeoutId)
    },
    computed: {
        ...mapState(['me', 'midi']),
        ...mapGetters(['getInstrumentChannel']),
        isPractice () {
            return this.game ? (this.game.mode === 'practice') : false
        }
    },
    methods: {
        ...mapActions(['fetchMe', 'finishGameUser', 'completeBadges', 'generateQuestion', 'storeAnswer', 'setupMidi']),
        playNote (pitch, delay) {
            this.$emit('play-note', pitch, delay)
        },
        addNote (pitch) {
            this.notification = ''
            this.$emit('add-note', pitch)
            this.nAdditions++
        },
        removeNote () {
            if (this.answer.length > 1) {
                this.notification = ''
                this.$emit('remove-note')
                this.nDeletions++
            }
        },
        clearNotes () {
            this.notification = ''
            this.$emit('clear-notes')
        },
        notesChanged (notes) {
            this.answer = notes
        },
        playNotes () {
            if (!this.playing) {
                this.notification = ''
                this.nPlaybacks++
                this.playing = true
                this.noteTimeoutIds = []

                for (let i = 0; i < this.sample.length; i++) {
                    this.noteTimeoutIds.push(setTimeout(() => this.playNote(this.sample[i], this.notes.delay), i * this.notes.delay))
                }

                this.playingTimeoutId = setTimeout(() => { this.playing = false }, this.sample.length * this.notes.delay)
            }
        },
        stopNotes () {
            if (this.playing) {
                for (const timeoutId of this.noteTimeoutIds) {
                    clearTimeout(timeoutId)
                }
                clearTimeout(this.playingTimeoutId)
                this.playing = false
            }
        },
        keyPressed (pitch) {
            const n = this.answer.length
            const correct = pitch === this.sample[n] || (pitch in this.sharpFlatMap && this.sharpFlatMap[pitch] === this.sample[n])
            this.$emit('color-key', { pitch: pitch, correct: correct })
        },
        getCurrentTimeInMilliseconds () {
            return new Date().getTime()
        },
        startGame () {
            this.instructing = false
            this.playNotes()
            this.timer.run(this.maxTimePerQuestion, 10000)
            this.startTime = this.getCurrentTimeInMilliseconds()
            this.timeoutId = setTimeout(() => {
                this.saveAnswer(this.maxTimePerQuestion, false)
            }, this.maxTimePerQuestion)
        },
        checkCorrectness () {
            const timeElapsed = this.getCurrentTimeInMilliseconds() - this.startTime

            this.notification = ''

            if (this.answer.length < this.sample.length) {
                this.notification = 'Vnesli ste premalo not.'
                return
            }

            this.nAnswers++

            for (let i = 0; i < this.sample.length; i++) {
                const answerPitch = this.answer[i].pitch
                const correctPitch = this.sample[i]
                if (answerPitch === correctPitch || (answerPitch in this.sharpFlatMap && this.sharpFlatMap[answerPitch] === correctPitch)) {
                    continue
                }
                this.notification = 'Odgovor je napačen.'
                if (this.nAnswers === this.maxAnswersPerQuestion) {
                    this.saveAnswer(timeElapsed, false)
                }
                return
            }

            this.saveAnswer(timeElapsed)
        },
        saveAnswer (time, success = true) {
            this.loading = true
            clearTimeout(this.timeoutId)
            this.timer.pause()

            this.storeAnswer({ game_id: this.game.id, user_id: this.me.id, question_id: this.questionId, time: time, n_additions: this.nAdditions, n_deletions: this.nDeletions, n_playbacks: this.nPlaybacks, n_answers: this.nAnswers, success: success }).then(() => {
                this.clearNotes()
                this.startTime = 0
                this.nAdditions = 0
                this.nDeletions = 0
                this.nPlaybacks = 0
                this.nAnswers = 0

                if (this.number === this.nQuestions) {
                    this.number = 0
                    this.chapter++
                }

                if (this.chapter > this.nChapters) {
                    this.finishGame()
                } else {
                    this.number++
                    this.nextQuestion()
                }
            })
        },
        nextQuestion () {
            this.generateQuestion({ game_id: this.game.id, chapter: this.chapter, number: this.number }).then((question) => {
                this.questionId = question.id
                this.sample = question.content.split(',')
                this.$nextTick(() => this.addNote(this.sample[0]))
                this.playNotes()

                this.loading = false
                this.timer.run(this.maxTimePerQuestion, 10000)
                this.startTime = this.getCurrentTimeInMilliseconds()
                this.timeoutId = setTimeout(() => {
                    this.saveAnswer(this.maxTimePerQuestion, false)
                }, this.maxTimePerQuestion)
            })
        },
        finishGame () {
            this.finishGameUser({ gameId: this.game.id, userId: this.me.id }).then(() => {
                this.completeBadges(this.me.id).then(() => {
                    this.loading = false
                    this.$router.push({ name: 'gameStatistics', params: { id: this.game.id } })
                })
            })
        }
    }
}
</script>
