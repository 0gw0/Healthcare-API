export default function Layout({ doctor, user, nurse}) {
	const role = 'nurse';
	if (role === 'nurse'){
		return nurse
	}else if(role === 'doctor'){
		return doctor
	}else{
		return user
	}
	return <>{role === 'nurse' ? doctor : user}</>;
}
