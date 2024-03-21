export default function Layout({ doctor, user }) {
	const role = 'doctor';
	return <>{role === 'doctor' ? doctor : user}</>;
}
