import loadingImg from '../assets/img/loading.gif'

export function Loading() {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        marginTop: '35px'
    }

    return <div className="loading-container"  style={style}>
        <img className="loading-img"src={loadingImg} alt="" />
    </div>
}