import chalk from 'chalk'
import {ex, PADLVL, printTestInfo, printPad} from './util.js'
import {chai, expect} from './chai.js'
import {isAsyncFunction} from 'util/types';

const printSuiteName = name => console.log( '\n\n  ' + chalk.bold( name ) )

class Psuit {
	#okayCount: number;
	#failCount: number;
	#isSuiteNamePrinted = false;
	#isFirstTest=true;
	#suiteName:string;

	constructor ( name: string ) {
		this.#okayCount = 0
		this.#failCount = 0
		this.#suiteName = name
	}

	log ( str: string | object ) {
		if ( typeof str === 'object' ) str = ex( str )
		const { main, sub, data } = PADLVL
		printPad( chalk.grey( str ), main + sub + data )
	}

	it<T=any> ( name: string, fn: () => T ):ReturnType<typeof fn> {
		if (this.#isFirstTest){
			printSuiteName(this.#suiteName);
			this.#isFirstTest=false;
		}

		let retval: any
		let benchMs: number
		const now = new Date()

		const then = data => {
			this.#okayCount++
			benchMs = new Date().getTime() - now.getTime()
			printTestInfo( { name, benchMs, success: true } )
			return data
		}
		const catchErr = err => {
			this.#failCount++
			benchMs = new Date().getTime() - now.getTime()
			printTestInfo( { name, benchMs, success: false, err: <Error>err } )
			return err
		}

		if (isAsyncFunction(fn)) {
			// @ts-ignore
			return fn().then(then).catch(catchErr)
		}
		else {
			try {retval = fn(); return then(retval)}
			catch(err ) {return catchErr(err)}
		}

	}

	done () {
		let fn = chalk.red
		const stats: string[] = []
		const err = this.#failCount + ' failed'
		let ok = this.#okayCount + ' passed'

		if ( !this.#failCount ) {
			fn = chalk.grey
			ok += ' 🏆'
		}

		stats.push( chalk.green( ok ) )
		stats.push( fn( err ) )
		printPad( '\n' + stats.join( '\n' ), PADLVL.main + PADLVL.sub )
	}
}

export {chai, expect}
export default Psuit
