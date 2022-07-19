import chalk from 'chalk'
import { expand } from './lib-test.js'

const printPadLvl = { main: 8, sub: 2, data: 2 }

const printPad = ( str: string, lvl = printPadLvl.main ) => {
	const wsp = ' '.repeat( lvl )
	console.log( wsp + str.replace( /\n/g, '\n' + wsp ) )
}

interface TestInfoInput {
	name: string
	benchMs: number
	success: boolean
	err?: Error
}

function printTestInfo ( { name, benchMs, success, err }: TestInfoInput ) {
	const emoji = { true: '✓', false: '✗' }
	const fn = { true: chalk.green, false: chalk.red }

	const title = fn[success + '']( emoji[success + ''] + ' ' + name )
	const ms = chalk.grey( benchMs + ' ms' )
	const lvl = printPadLvl.sub + printPadLvl.main

	printPad( [title, ms].join( ' ' ), lvl )
	if ( err ) printPad( chalk.red( err.message ), lvl + printPadLvl.data )
}

export class Psuit {
	#OkayCount: number
	#FailCount: number

	constructor ( name: string ) {
		this.#OkayCount = 0
		this.#FailCount = 0
		console.log( '\n\n  ' + chalk.bold( name ) )
	}

	log ( str: string | object ) {
		if ( typeof str === 'object' ) str = expand( str )
		const { main, sub, data } = printPadLvl
		printPad( chalk.grey( str ), main + sub + data )
	}

	async it ( name: string, fn: () => Promise< unknown > ): Promise< any > {
		let retval: unknown
		let benchMs: number
		const now = new Date()

		try {
			retval = await fn()

			this.#OkayCount++
			benchMs = new Date().getTime() - now.getTime()
			printTestInfo( { name, benchMs, success: true } )
			return retval
		} catch ( err ) {
			this.#FailCount++
			benchMs = new Date().getTime() - now.getTime()
			printTestInfo( { name, benchMs, success: false, err: <Error>err } )
			//console.log( chalk.red( cutil.expand( err ) ) )
			return err
		}
	}

	done () {
		let fn = chalk.red
		const stats: string[] = []
		const err = this.#FailCount + ' failed'
		let ok = this.#OkayCount + ' passed'

		if ( !this.#FailCount ) {
			fn = chalk.grey
			ok += ' 🏆'
		}

		stats.push( chalk.green( ok ) )
		stats.push( fn( err ) )
		printPad( '\n' + stats.join( '\n' ), printPadLvl.main + printPadLvl.sub )
	}
}
