const Pagination = {
  buildOffset: (page, limit) => {
    let result = page * limit - limit;
    return result ? result : 0;
  },
};

module.exports = Pagination;
