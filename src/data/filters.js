export default [
  { id: 'all', title: 'All', filterByStatus: () => true },
  { id: 'active', title: 'Active', filterByStatus: ({ completed }) => !completed },
  { id: 'completed', title: 'Completed', filterByStatus: ({ completed }) => completed },
]
