import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
            institute: user.institute || "",
            department: user.department || "",
            institute_address: user.institute_address || "",
            expertise: user.expertise || "",
            avatar: null, //bug avatar can update
        });

    const submit = (e) => {
        e.preventDefault();
        console.log("Submitting data:", data);
        patch(route("profile.update"), {
            onSuccess: () => {
                window.location.reload(); // Force a full page reload
            },
            onError: (errors) => console.log("Submission errors:", errors),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                {/* Avatar */}
                <div>
                    {user.avatar && (
                        <img
                            src={`/storage/${
                                user.avatar
                            }?v=${new Date().getTime()}`}
                            alt="User Avatar"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    )}
                    <InputLabel htmlFor="avatar" value="Avatar" />
                    <input
                        id="avatar"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("avatar", e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Institute */}
                <div>
                    <InputLabel htmlFor="institute" value="Institute" />
                    <TextInput
                        id="institute"
                        className="mt-1 block w-full"
                        value={data.institute}
                        onChange={(e) => setData("institute", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.institute} />
                </div>

                {/* Department */}
                <div>
                    <InputLabel htmlFor="department" value="Department" />
                    <TextInput
                        id="department"
                        className="mt-1 block w-full"
                        value={data.department}
                        onChange={(e) => setData("department", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.department} />
                </div>

                {/* Institute Address */}
                <div>
                    <InputLabel
                        htmlFor="institute_address"
                        value="Institute Address"
                    />
                    <TextInput
                        id="institute_address"
                        className="mt-1 block w-full"
                        value={data.institute_address}
                        onChange={(e) =>
                            setData("institute_address", e.target.value)
                        }
                    />
                    <InputError
                        className="mt-2"
                        message={errors.institute_address}
                    />
                </div>

                {/* Expertise */}
                <div>
                    <InputLabel htmlFor="expertise" value="Expertise" />
                    <TextInput
                        id="expertise"
                        className="mt-1 block w-full"
                        value={data.expertise}
                        onChange={(e) => setData("expertise", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.expertise} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
