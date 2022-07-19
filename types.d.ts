type sortinfo = { ascending?: boolean; descending?: boolean }

declare namespace Chai {
	export interface Assertion {
		sorted: ( sortinfo ) => void
		sortedBy: ( key: string, sortinfo ) => void
		ascendingBy: ( key: string ) => void
		descendingBy: ( key: string ) => void
		ascending: Assertion
		descending: Assertion
	}
}
