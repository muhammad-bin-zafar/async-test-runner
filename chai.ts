import chai, { expect } from 'chai'
import chaiArr from 'chai-arrays'
import chaiAsProm from 'chai-as-promised'
import chaihttp from 'chai-http'
import chaiJson from 'chai-json-schema'
import chaiLike from 'chai-like'
import chaiSorted from 'chai-sorted'
import chaiSubset from 'chai-subset'
import chaiThings from 'chai-things'
import chaiDeep from 'deep-equal-in-any-order'
chai.use( chaihttp )
chai.use( chaiLike )
chai.should()
chai.use( chaiThings )
chai.use( chaiDeep )
chai.use( chaiSubset )
chai.use( chaiAsProm )
chai.use( chaiJson )
chai.use( <any>chaiSorted )
chai.use( chaiArr )

export {chai, expect}
