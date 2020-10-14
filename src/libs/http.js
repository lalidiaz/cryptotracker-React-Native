
class Http {
    static instance = new Http();

    get = async (url) => {
        try{
            
            let req = await fetch(url);

            let json = await req.json();

            return json;

        } catch (err) {
            console.log('Http get method error', err)

            throw Error(err);
        }
    }

    post = async (url, body) => {
        try{

            let req = await fetch(url, {
                method: 'POST',
                body
            });

            let json = await req.json();

            return json;

        } catch(err) {
            console.log('Http method post error', err)

            throw Error(err);
        }
    }

    remove = async (url) => {
        try{
            let req = await fetch(url, {
                method: 'DELETE'
            });

            let json = await req.json();

            return json;

        } catch (err) {
            console.log('Http method Delete error', err);

            throw Error(err);

        }
    }

    put = async (url, body) => {
        try{
            let req = await fetch(url, {
                method: 'PUT',
                body
            });

            let json = req.json();

            return json;

        } catch (err) {
            console.log('Http method Put error', err);

            throw Error(err);
        }
    }

}

export default Http;