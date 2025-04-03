import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //   const fetchContacts = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8082/api/contacts', {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
  //         }
  //       });
        
  //       if (!response.ok) throw new Error('Failed to fetch');
        
  //       const data = await response.json();
  //       setContacts(data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //       navigate('/login');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchContacts();
  // }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/api/contacts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });

        setContacts(response.data);
      } catch (error) {
        console.error('Error:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate]);


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    // console.log(id);
    
    try {
      await axios.delete(`/api/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      setContacts(contacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };


  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="scroll-container bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-black px-6 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">{contact.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;