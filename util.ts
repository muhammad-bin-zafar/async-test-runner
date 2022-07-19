import chalk from 'chalk'
import util from 'node:util'

export const ex = (o, depth=10, showHidden=true)=> util.inspect(o, {colors:true, depth, showHidden})

/** A single test's result info. */
export interface TestInfoInput {
       name: string
       benchMs: number
       success: boolean
       err?: Error
}

/** Tab-padded whitespace levels. */
export const PADLVL = { main: 8, sub: 2, data: 2 }

export const printPad = ( str: string, lvl = PADLVL.main ) => {
	const wsp = ' '.repeat( lvl )
	console.log( wsp + str.replace( /\n/g, '\n' + wsp ) )
}

export function printTestInfo ( { name, benchMs, success, err }: TestInfoInput ) {
       const emojiList = { true: '✓', false: '✗' }
       const fnList = { true: chalk.green, false: chalk.red }

	   const fn = fnList[success + '']
	   const emoji = emojiList[success + '']
       const title = fn( emoji + ' ' + name )
       const ms = chalk.grey( benchMs + ' ms' )
       const lvl = PADLVL.sub + PADLVL.main

       printPad( [title, ms].join( ' ' ), lvl )
       if ( err ) printPad( chalk.red( err.message ), lvl + PADLVL.data )
}

