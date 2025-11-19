export default function sortDeps(deps) {
	const addedDeps = new Set()

	const sortedDeps = []
	const depAdded = dep => {
		return addedDeps.has(dep)
	}

	const getDeps = dep => deps[dep]

	const sorted = key => {
		const arrDeps = deps[key]
		for (let i = 0; i < arrDeps?.length; i++) {
			const dep = arrDeps[i]
			if (depAdded(dep)) {
				continue
			}
			const includeDeps = getDeps(dep)

			if (!includeDeps || !includeDeps?.length) {
				addedDeps.add(dep)
				sortedDeps.push(dep)
				continue
			}
			sorted(includeDeps)
			addedDeps.add(dep)
			sortedDeps.push(dep)
		}
	}

	Object.keys(deps).forEach(sorted)

	return sortedDeps
}

console.log(
	sortDeps({
		wrong: ['predicated', 'sexp_processor'],
		xpath: ['nokogiri'],
		predicated: ['htmlentities'],
		sexp_processor: [],
		nokogiri: ['wrong', 'libxml2'],
		libxml2: ['libxslt'],
		virtus: [],
	})
)
