export default (req, res) => {
    console.log('My log out page');
    res.clearCookie('jwtoken', { path:'' });
    res.status(200).send("User Logout");
};
  