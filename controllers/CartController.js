import UserModel from '../models/User.js';

export const addToCart = async (req, res) => {
  try {
    // const { userId, itemId } = req.body;

    // const { itemId } = req.body;
    const { itemId, quantity = 1 } = req.body;
    const userId = req.userId;

    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Added to cart', cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

// export const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;

//     const userData = await UserModel.findOne({ _id: userId });
//     let cartData = await userData.cartData;

//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }

//     await UserModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: 'Added to cart' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: 'Error occurred',
//     });
//   }
// };

export const getUserCart = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = req.userId;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    // const { userId, itemId, quantity } = req.body;
    const { itemId, quantity } = req.body;
    const userId = req.userId;

    const userData = await UserModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId] = quantity;

    await UserModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Cart updated', cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};

// export const removeFromCart = async (req, res) => {
//   try {
//     const { itemId } = req.body;
//     const userId = req.userId;
//     console.log(itemId, userId);

//     const userData = await UserModel.findById(userId);
//     console.log(userData);

//     if (!userData) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     let cartData = userData.cartData;
//     console.log(cartData);

//     if (!cartData[itemId]) {
//       return res.status(404).json({ message: 'Item not found in cart' });
//     }

//     // if (cartData[itemId] > 0) {
//     //   cartData[itemId] -= 1;
//     // }

//     delete cartData[itemId];
//     console.log(cartData);

//     await UserModel.findByIdAndUpdate(userId, { cartData });
//     res.json({ success: true, message: 'Item removed from cart' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: 'Error occurred',
//     });
//   }
// };

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;
    // console.log(userId);
    // console.log(itemId);

    const userData = await UserModel.findById(userId);
    // console.log(userData);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cartData = await userData.cartData;
    // console.log(cartData);

    if (!cartData[itemId]) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // if (cartData[itemId] > 0) {
    //   cartData[itemId] -= 1
    // }

    // if (cartData[itemId] > 0) {
    //   cartData[itemId] -= 1;
    // }

    delete cartData[itemId];

    await UserModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Item removed from cart', cartData });
    // res.json({ cartData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error occurred',
    });
  }
};
