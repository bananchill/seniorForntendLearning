const tree = [
	'A',
	[
		['B', [['D', [['H']]], ['E']]],
		[
			'C',
			[
				[
					'F',
					[
						['I', [['M']]],
						['J', [['N'], ['O']]],
					],
				],
				['G', [['K'], ['L']]],
			],
		],
	],
]

export default function transform(tree, replaceNode) {
	const nodes = new Map()
	const firstNode = tree[0]

	const setNodeMap = (key, children = []) => {
		nodes.set(key, {
			children,
		})
	}

	const transformTree = (tree, parent = '') => {
		const node = tree[0]
		const childrenTree = tree[1]
		if (node === 'I') {
			debugger
		}
		if (!childrenTree?.length) {
			setNodeMap(node, [])
			return
		}

		let isParentReplacedNode = node === replaceNode
		const children = node === replaceNode ? [parent] : []
		for (let i = 0; i < childrenTree.length; i++) {
			const res = transformTree(childrenTree[i], node)
			if (res && node !== firstNode) {
				isParentReplacedNode = true
				children.push(parent)
			} else if (childrenTree[i][0] !== replaceNode && !res) {
				children.push(childrenTree[i][0])
			}
		}
		setNodeMap(node, children)

		return isParentReplacedNode
	}
	transformTree(tree)

	const buildTree = nodeName => {
		const children = nodes.get(nodeName).children
		const result = [nodeName]
		if (!children?.length) {
			return result
		}
		const childrenTree = []

		for (let i = 0; i < children.length; i++) {
			childrenTree.push(buildTree(children[i]))
		}

		result.push(childrenTree)
		return result
	}

	return buildTree(replaceNode)
}

console.log(JSON.stringify(transform(tree, 'I')))
