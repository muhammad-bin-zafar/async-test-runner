import Suit, {expect} from './index.js'
const $math =new Suit('Math')
const $circle = new Suit('Math::Circle')

$math.it('add', () => {
	const a = 1
	const b = 2
	
	const result = a+b

	expect(result, 'incorrect sum').to.be.equal(3)
})

await $math.it('add, when async testfn', async () => {
	const a = 1
	const b = 2

	const result = a+b

	expect(result, 'incorrect sum').to.be.equal(3)
})

$math.done()


$circle.it('calculate circumference from radius', () => {
	const r = 10
	
	const result = 2*Math.PI*r

	expect(result.toFixed(2)).to.equal('62.83')
})

$circle.it('is circle a square?', () => {
	const result = true

	expect(result, 'circle is not a square').to.equal(false)
})

$circle.done()
