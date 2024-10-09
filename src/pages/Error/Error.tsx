import { useNavigate } from 'react-router';
import cls from './Error.module.scss';
import { memo, useEffect } from 'react';



const Error = memo(() => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/CheckProj', { replace: true });
    },[])
    return (
        <div className={cls.error}></div>
    );
});

export default Error;