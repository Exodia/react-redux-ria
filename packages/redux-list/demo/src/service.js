export const fetcher = async (query = {}) => {
  console.log('query', query);

  const current = query.page ? query.page.current : 1;

  const results = Array(10).fill(1).map((v, i) => ({
    id: `${current + i}`,
    name: `姓名${current + i}`,
    age: 10 + i,
    address: `西湖区湖底公园${current + i}号`
  }));

  return new Promise(resolve => {
    setTimeout(() => resolve({
      results,
      total: 100,
      current
    }), 1200);
  })
};
