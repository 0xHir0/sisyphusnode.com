const truncate = (addr) => {
  var sep = '...';
  var front = addr.substr(0, 10);
  var back = addr.substr(addr.length - 4);
  return front + sep + back;
};

const trimAccount = (accountString) => {
  return `${accountString.slice(0, 6)}...${accountString.slice(
    accountString.length - 4,
    accountString.length
  )}`;
};

export { truncate, trimAccount };
