import React, { useEffect } from "react";
import "./Profile.scss"
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { getUser, updatePhoto, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { shortenText } from "../../utils";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';

const Profile = () => {
    const { isLoading, user } = useSelector((state) => state.auth);

    const initialState = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: user?.address || {
            address: user?.address?.address || "",
            province: user?.address?.province || "",
            country: user?.address?.country || "",
        },
    };

    const [profile, setProfile] = React.useState(initialState);
    const [profileImage, setProfileImage] = React.useState(null);
    const [imagePreview, setImagePreview] = React.useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user === null)
            dispatch(getUser());
    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                role: user?.role || "",
                photo: user?.photo || "",
                address: user?.address || {
                    address: user?.address?.address || "",
                    province: user?.address?.province || "",
                    country: user?.address?.country || "",
                },
            });
        }


    }, [user]);

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };
    const saveProfile = async (e) => {
        e.preventDefault();
        const userData = {
            name: profile.name,
            phone: profile.phone,
            address: {
                address: profile.address,
                province: profile.province,
                country: profile.country,
            },
        }
        await dispatch(updateUser(userData));
    };
    const savePhoto = async (e) => {
        e.preventDefault();
        let imageURL = "";

        try {
            if (
                profileImage !== null &&
                (profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png")
            ) {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", cloud_name);
                image.append("upload_preset", upload_preset);

                // Save image to cloudinary
                const response = await fetch(url, {
                    method: "post",
                    body: image,
                });

                const imgData = await response.json();
                imageURL = imgData.url.toString();
            }
            // Save image to MongoDB
            const userData = {
                photo: profileImage ? imageURL : profile.photo,
            }
            await dispatch(updatePhoto(userData));
            setImagePreview(null);
        } catch (error) {
            toast.error(error.message);
        }

    };

    return (
        <>
            <section>
                {isLoading && <Loader />}
                <div className="container">
                    <PageMenu />
                    <h2>Trang cá nhân</h2>
                    <div className="--flex-start profile">
                        <Card cardClass={"card"}>
                            {!isLoading && (
                                <>
                                    <div className="profile-photo">
                                        <div>
                                            <img src={imagePreview === null ? user?.photo : imagePreview} alt="profile-img" />
                                            <h3>{user?.name}</h3>
                                            {imagePreview !== null && (
                                                <div className="--center-all">
                                                    <button className="--btn --btn-secondary" onClick={savePhoto}>
                                                        <AiOutlineCloudUpload size={18} /> Tải ảnh lên
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <form onSubmit={saveProfile}>
                                        <p>
                                            <label>Thay đổi hình ảnh:</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                onChange={handleImageChange}
                                            />
                                        </p>
                                        <p>
                                            <label>Tên:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={profile?.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile?.email}
                                                onChange={handleInputChange}
                                                disabled
                                            />
                                        </p>
                                        <p>
                                            <label>Số điện thoại:</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile?.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Địa chỉ:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={profile?.address?.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Tỉnh:</label>
                                            <input
                                                type="text"
                                                name="province"
                                                value={profile?.address?.province}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <p>
                                            <label>Quốc gia:</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={profile?.address?.country}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </p>
                                        <button className="--btn --btn-primary --btn-block">Cập nhật</button>
                                    </form>
                                </>
                            )}
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}

export const UserName = () => {
    const { user } = useSelector((state) => state.auth);

    const username = user?.name || "...";
    return (
        <span style={{color: "#ff7722"}}>Chào, {shortenText(username, 10)} |</span>
    )
}

export default Profile;