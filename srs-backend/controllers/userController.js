const User = require("../models/User");

exports.getProfile = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

};

exports.updateProfile =
    async (req, res) => {

        try {

            const {
                name,
                email
            } = req.body;

            const user =
                await User.findById(
                    req.user.id
                );

            if (!user) {

                return res
                    .status(404)
                    .json({
                        message:
                            "User not found"
                    });

            }

            user.name = name;
            user.email = email;

            await user.save();

            res.json({
                message:
                    "Profile Updated",
                user
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };