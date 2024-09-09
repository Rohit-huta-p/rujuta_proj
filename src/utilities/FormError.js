import { FaCircleInfo } from "react-icons/fa6";
const formError = (data) => {
    const errors = [];
    Object.entries(data).forEach(([field, value]) => {
        if(!value){
            errors.push(field);
        }
    })
    return errors

}
const getErrorMessage = (field, errors) => {
    if (errors.includes(field)) {
        return (
            <div className='flex items-center'>
                <FaCircleInfo size={13} color='red' className='mr-1'/>
                <p className='text-sm text-red-500'>Please enter {field}</p>
            </div>
    );
    }
    return null;
};

export { formError, getErrorMessage };