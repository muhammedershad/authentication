import React, { useEffect, useState } from "react";
import axios from "../../axios/axios_instance";
import SuccessToast from "../../components/SuccessToast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/adminSlice";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [success, setSuccess] = useState(false);
  const [editUser, setEditUser] = useState({
    email: "",
    username: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUser(user); // Set the editUser state to the selected user
    setOpenModal(true);
  };

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  useEffect(() => {
    if (openModal) {
    }
  }, [openModal]);

  useEffect(() => {
    axios
      .get("/admin/alluser")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteUser = (userId) => {
    axios
      .delete(`/admin/deleteuser/${userId}`)
      .then((res) => {
        setUsers(res.data.users);
        setSuccess(res.data.success);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = async () => {
    axios(`/admin/logout`);
    dispatch(logout());
    navigate("/admin/login");
  };

  const handleEditSubmit = (userId) => {
    axios
      .post(`/admin/edituser/${userId}`, editUser)
      .then((res) => {
        setUsers(res.data.users);
        setSuccess(res.data.success);
        setOpenModal(false);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
      
  };

  return (
    <div>
      {success && <SuccessToast message="User deleted" />}
      <h1 className="text-white text-center text-3xl my-6">Dashboard</h1>
      <div className="flex justify-between">
        <Link to="/admin/signup">
          <button className="text-white bg-gray-800 p-2 rounded-md ml-3 mb-2">
            Add user
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="text-white bg-gray-800 p-2 rounded-md mr-3 mb-2"
        >
          Logout
        </button>
      </div>
      <div className="relative mx-2 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-center py-4 bg-white dark:bg-gray-800">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={
                        user.profilePicture ||
                        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJ6aCBAcZ4ldYdG3do9HOShAndpdghkiL74xysu9a-JezzYY-LK3nkp62Z8RPcHsZQAY&usqp=CAU`
                      }
                      alt="Jese image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.username}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-base font-semibold">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {/* Modal toggle */}
                    {/* <a
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a> */}
                    <Button onClick={() => handleEditUser(user)}>
                      Edit user
                    </Button>

                    <Modal
                      show={openModal}
                      size="md"
                      onClose={onCloseModal}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Edit User
                          </h3>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                              id="email"
                              placeholder="name@company.com"
                              value={editUser.email}
                              onChange={(event) =>
                                setEditUser({
                                  ...editUser,
                                  email: event.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="username" value="Your Username" />
                            </div>
                            <TextInput
                              id="username"
                              value={editUser.username}
                              onChange={(event) =>
                                setEditUser({
                                  ...editUser,
                                  username: event.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <Button
                            onClick={() => handleEditSubmit(selectedUser?._id)}
                          >
                            Submit
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </td>
                  <td className="px-6 py-4">
                    {/* Modal toggle */}
                    <a
                      onClick={() => handleDeleteUser(user._id)}
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete user
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
