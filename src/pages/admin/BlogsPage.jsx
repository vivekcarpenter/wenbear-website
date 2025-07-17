import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import BlogForm from "./BlogForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import DeleteModal from "../../components/DeleteModal";
import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useAddBlogMutation,
  useDeleteBlogMutation
} from "../../store/services/blogApi";

const BlogsPage = () => {
  const { data, isLoading ,refetch } = useGetAllBlogsQuery();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [addBlog] = useAddBlogMutation(); 
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuBlog, setMenuBlog] = useState(null);

  const [imageIndex, setImageIndex] = useState(0);

  const openMenu = (event, blog) => {
    setAnchorEl(event.currentTarget);
    setMenuBlog(blog);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setMenuBlog(null);
  };

  const handleCreate = async (formData) => {
  try {
    const res = await addBlog(formData).unwrap(); // ✅ API call
    console.log("Blog created:", res);
    setShowCreateModal(false);
    refetch(); // Refresh the blog list
  //  setSelectedBlog(null); // Clear selected blog
  } catch (err) {
    console.error("Create blog failed:", err);
  }
};


  const handleEdit = async (formData) => {
    try {
      const res = await updateBlog({
        id: selectedBlog._id || selectedBlog.id,
        body: formData,
      }).unwrap();

      console.log("Updated:", res);
      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = () => {
    if (!selectedBlog) return;
    deleteBlog(selectedBlog._id || selectedBlog.id)
    setShowDeleteModal(false);
  };

  const posts = data?.data?.posts || [];

  useEffect(() => {
    if (showViewModal || showCreateModal || showEditModal || showDeleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showViewModal, showCreateModal, showEditModal, showDeleteModal]);

  useEffect(() => {
    if (selectedBlog) {
      setImageIndex(0); // Reset image index on open
    }
  }, [selectedBlog]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Blogs</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#456882] text-white px-5 py-2 rounded-lg shadow hover:bg-[#5fa2d5] transition-all duration-300"
        >
          + Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((blog) => {
          return (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              <img
                src={blog.images?.[0] || "/default.jpg"}
                alt="Blog"
                className="w-full h-44 sm:h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {blog.content}
                </p>
              </div>
              <div className="absolute top-2 right-2">
                <IconButton onClick={(e) => openMenu(e, blog)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            setSelectedBlog(menuBlog);
            setShowViewModal(true);
            closeMenu();
          }}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedBlog(menuBlog);
            setShowEditModal(true);
            closeMenu();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSelectedBlog(menuBlog);
            setShowDeleteModal(true);
            closeMenu();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* Create Modal */}
      {showCreateModal && (
        <Modal title="Create Blog" onClose={() => setShowCreateModal(false)}>
          <BlogForm onSubmit={handleCreate} />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedBlog && (
        <Modal title="Edit Blog" onClose={() => setShowEditModal(false)}>
          <BlogForm initialData={selectedBlog} onSubmit={handleEdit} />
        </Modal>
      )}

      {/* View Modal with Custom Slider */}
      {showViewModal && selectedBlog && (
        <Modal
          title={selectedBlog.title}
          onClose={() => setShowViewModal(false)}
        >
          <div className="relative mb-4">
            <img
              src={selectedBlog.images?.[imageIndex]}
              alt={`Slide ${imageIndex + 1}`}
              className="w-full h-60 sm:h-72 object-cover rounded-t-lg"
            />
            {selectedBlog.images?.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImageIndex((prev) =>
                      prev === 0 ? selectedBlog.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1.5 rounded-full shadow hover:bg-gray-200 transition"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setImageIndex((prev) =>
                      prev === selectedBlog.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1.5 rounded-full shadow hover:bg-gray-200 transition"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="text-gray-700 whitespace-pre-line">
            {selectedBlog.content}
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedBlog && (
        <DeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
          blogTitle={selectedBlog.title}
        />
      )}
    </div>
  );
};

export default BlogsPage;
