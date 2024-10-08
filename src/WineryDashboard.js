import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, Rate, Tag } from '@/components/ui/table';
import { Search } from 'lucide-react';

const wineryData = [
  {
    id: 1,
    name: 'ACTA',
    location: '123 Main St, Sonoma, CA 95476',
    phone: '(707) 123-4567',
    wineSelection: ['Cabernet Sauvignon', 'Chardonnay', 'Pinot Noir'],
    rating: 4.5,
    reviews: [
      { id: 1, text: 'Great wine tasting experience!', rating: 5 },
      { id: 2, text: 'Beautiful vineyard with excellent service.', rating: 4 },
    ],
  },
  // Add more wineries here...
];

const WineryDashboard = () => {
  const [wineries, setWineries] = useState(wineryData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWinery, setSelectedWinery] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch data from an API here
    // For this example, we're using the static wineryData
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredWineries = wineries.filter((winery) =>
    winery.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => showWineryDetails(record)}>View Details</Button>
      ),
    },
  ];

  const showWineryDetails = (winery) => {
    setSelectedWinery(winery);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Winery Dashboard</h1>
      <div className="mb-4 flex items-center">
        <Input
          placeholder="Search wineries"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="mr-2"
        />
        <Button><Search size={16} /></Button>
      </div>
      <Table columns={columns} dataSource={filteredWineries} rowKey="id" />
      <Modal
        title={selectedWinery?.name}
        isOpen={isModalVisible}
        onClose={handleModalClose}
      >
        {selectedWinery && (
          <div>
            <p><strong>Location:</strong> {selectedWinery.location}</p>
            <p><strong>Phone:</strong> {selectedWinery.phone}</p>
            <p><strong>Wine Selection:</strong></p>
            <div className="mb-2">
              {selectedWinery.wineSelection.map((wine, index) => (
                <Tag key={index} className="mr-1 mb-1">{wine}</Tag>
              ))}
            </div>
            <p><strong>Rating:</strong> <Rate disabled defaultValue={selectedWinery.rating} /></p>
            <p><strong>Reviews:</strong></p>
            {selectedWinery.reviews.map((review) => (
              <div key={review.id} className="mb-2">
                <p>{review.text}</p>
                <Rate disabled defaultValue={review.rating} />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WineryDashboard;