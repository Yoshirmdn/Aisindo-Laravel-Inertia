import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        avatar: null,
        gender: "",
        institute: "",
        department: "",
        institute_address: "",
        expertise: "",
        payment_proof: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Phone */}
                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        id="phone"
                        type="text"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                {/* Avatar */}
                <div className="mt-4">
                    <InputLabel htmlFor="avatar" value="Avatar" />
                    <input
                        id="avatar"
                        type="file"
                        name="avatar"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("avatar", e.target.files[0])}
                    />
                    <InputError message={errors.avatar} className="mt-2" />
                </div>

                {/* Gender */}
                <div className="mt-4">
                    <InputLabel htmlFor="gender" value="Gender" />
                    <select
                        id="gender"
                        name="gender"
                        value={data.gender}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("gender", e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <InputError message={errors.gender} className="mt-2" />
                </div>

                {/* Institute */}
                <div className="mt-4">
                    <InputLabel htmlFor="institute" value="Institute" />
                    <TextInput
                        id="institute"
                        type="text"
                        name="institute"
                        value={data.institute}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("institute", e.target.value)}
                    />
                    <InputError message={errors.institute} className="mt-2" />
                </div>

                {/* Department */}
                <div className="mt-4">
                    <InputLabel htmlFor="department" value="Department" />
                    <TextInput
                        id="department"
                        type="text"
                        name="department"
                        value={data.department}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("department", e.target.value)}
                    />
                    <InputError message={errors.department} className="mt-2" />
                </div>

                {/* Institute Address */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="institute_address"
                        value="Institute Address"
                    />
                    <TextInput
                        id="institute_address"
                        type="text"
                        name="institute_address"
                        value={data.institute_address}
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("institute_address", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.institute_address}
                        className="mt-2"
                    />
                </div>

                {/* Expertise */}
                <div className="mt-4">
                    <InputLabel htmlFor="expertise" value="Expertise" />
                    <TextInput
                        id="expertise"
                        type="text"
                        name="expertise"
                        value={data.expertise}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("expertise", e.target.value)}
                    />
                    <InputError message={errors.expertise} className="mt-2" />
                </div>

                {/* Payment Proof */}
                <div className="mt-4">
                    <InputLabel htmlFor="payment_proof" value="Payment Proof" />
                    <input
                        id="payment_proof"
                        type="file"
                        name="payment_proof"
                        className="mt-1 block w-full"
                        onChange={(e) =>
                            setData("payment_proof", e.target.files[0])
                        }
                    />
                    <InputError
                        message={errors.payment_proof}
                        className="mt-2"
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
