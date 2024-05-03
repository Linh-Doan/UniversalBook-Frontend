function MembershipDetails() {
  // You can fetch and manage membership data here
  const membership = {
    type: 'Premium',
    expirationDate: '2024-12-31',
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Membership Details</h3>
      <p>Type: {membership.type}</p>
      <p>Expiration Date: {membership.expirationDate}</p>
    </div>
  );
}

export default MembershipDetails;
