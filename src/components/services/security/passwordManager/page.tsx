import dynamic from 'next/dynamic';

export const metadata = {
  title: "Password Manager | UtiliHub",
  description: "Generate secure passwords with customizable options",
}

const PasswordManager = dynamic(
  () => import("@/components/Password/PasswordManager"),
  {
    ssr: true,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
      </div>
    ),
  }
);

const Manager = () => {

    return <PasswordManager />;
};

export default Manager;
