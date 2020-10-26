import Vue from 'vue'
import { 
  Button,
  Row,
  Col,
  Icon,
  Alert,
  Scroll,
  Tabs,
  TabPane,
  Spin,
  Modal,
  Message,
  Table,
  Tag,
  Form,
  FormItem,
  Input,
} from 'view-design'

Vue.component('Button', Button)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)
Vue.component('Alert', Alert)
Vue.component('Scroll', Scroll)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Spin', Spin)
Vue.component('Modal', Modal)
Vue.component('Table', Table)
Vue.component('Tag', Tag)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)


Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message

import 'view-design/dist/styles/iview.css'
