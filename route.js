const HOME = '/';
const USER = '/user';
const USER_DETAIL = '/userdetail';

const LOGIN = '/login';
const LOCALLOGIN = '/locallogin';
const FACEBOOKLOGIN = '/facebooklogin';
const INSTAGRAMLOGIN = '/instagramlogin';
const GITHUBLOGIN = '/githublogin';


const JOIN = '/join';

const FOOD = '/food';
const FILEUPLOAD = '/fileupload';
const LIST = '/list';
const UPLOADFOOD = '/uploadfood';
const FOODDETAIL = '/:id';

const routes = {
	home: HOME,
	user: USER,
	userDetail: (id) => {
		if (id) {
			return `/users/${id}`;
		} else {
			return USER_DETAIL;
		}
	},
	login: LOGIN,
	locallogin: LOCALLOGIN,
	facebooklogin: FACEBOOKLOGIN,
	instagramlogin: INSTAGRAMLOGIN,
	githublogin : GITHUBLOGIN,

	join: JOIN,

	food: FOOD,
	fileUpload: FILEUPLOAD,
	list: LIST,

	uploadFood: UPLOADFOOD,
	foodDetail: (id) => {
		if (id) {
			return `/food/${id}`;
		} else {
			return FOODDETAIL;
		}
	}
};

export default routes;