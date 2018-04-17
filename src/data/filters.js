export default [
  { id: 'all', title: 'All', counter: () => true },
  { id: 'active', title: 'Active', counter: ({ completed }) => !completed },
  { id: 'completed', title: 'Completed', counter: ({ completed }) => completed },
]
