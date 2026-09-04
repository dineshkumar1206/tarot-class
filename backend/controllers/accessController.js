const UserPurchase = require('../models/UserPurchase');

exports.checkAccess = async (req, res) => {
  const { phone } = req.params;

  if (!phone) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  try {
    const purchase = await UserPurchase.findOne({
      where: { phone_number: phone },
      order: [['purchase_date', 'DESC']]
    });

    if (!purchase) {
      return res.json({ success: true, hasAccess: false, status: 'NOT_FOUND' });
    }

    if (purchase.payment_status === 'PAID') {
      return res.json({ success: true, hasAccess: true, status: 'PAID' });
    } else {
      return res.json({ success: true, hasAccess: false, status: purchase.payment_status });
    }

  } catch (error) {
    console.error('Error checking access:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
