import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

export const useError = () => {
    const toast = useToast()
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error)
            toast({
                title: 'Une erreur est survenue !',
                description: error,
                status: 'error',
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            })
    }, [error])

    return {
        error,
        setError
    }
};
