import { requirePermission } from '../middleware/permissions.js';

router.get('/user-list', requirePermission('view_user'), showUserList);
router.post('/add-user', requirePermission('add_user'), CreateUser);
router.post('/delete-user/:id', requirePermission('delete_user'), deleteUser);
