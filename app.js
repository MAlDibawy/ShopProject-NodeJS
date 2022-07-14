const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const sequelize = require('./util/db');

// Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 error page
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '/404'
    });
});

//adding DB relations
Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
    through: OrderItem
});


sequelize
    .sync()
    // .sync({
    //     force: true
    // })
    .then(() => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                username: 'DIBAWY',
                email: 'mahmoudaldibawy@gmail.com'
            });
        }
        return user;
    })
    .then(user => {
        Cart
            .findAll({
                where: {
                    userId: user.id
                }
            })
            .then(cart => {
                if (!cart.length)
                    return user.createCart()
            })
            .catch(err => console.log(err));
    })
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });