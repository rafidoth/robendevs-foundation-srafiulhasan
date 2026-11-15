- React is a JavaScript library to build user interfaces.
- React is not a full framework. It does not include routing, data fetching, or a build tool.
- You describe what the screen must look like for a given state. React updates the screen for you. This is the declarative model.
- The UI is a tree of components. Each component is a JavaScript function that returns markup.
- The UI is a function of state: `UI = f(state)`. When state changes, React runs the function again.

## 2. Set up a project

- Use a build tool. Vite is a common choice. Next.js and React Router are common frameworks.
- Do not use Create React App. The React team no longer recommends it.
- A basic entry file looks like this:

```jsx
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
```

- `createRoot` makes one React root. React controls all the DOM inside that root.

## 3. JSX

- JSX is a syntax that looks like HTML. It is not HTML. A compiler changes it to JavaScript function calls.
- A component must return one root element. Use a Fragment (`<>...</>`) if you do not want an extra DOM node.
- Use `{}` to put a JavaScript expression in JSX. You can use variables, function calls, and ternaries. You cannot use statements such as `if` or `for`.
- Attribute names use camelCase: `className`, `htmlFor`, `onClick`, `tabIndex`.
- Close all tags. Write `<img />` and `<input />`.
- Inline styles use an object: `style={{ color: 'red', fontSize: 16 }}`.
- Component names start with a capital letter. Lowercase names are DOM tags.
- React escapes values in `{}`. This helps prevent XSS attacks. `dangerouslySetInnerHTML` removes this protection. Use it only with trusted, clean content.

## 4. Components

- A component is a function. It takes props and returns JSX.
- A component must be pure. For the same props, state, and context, it must return the same JSX.
- Do not change variables outside the component during render. Do not do side effects during render.
- Do not define a component inside another component. React sees a new component type on each render. It destroys and recreates the DOM and state each time.
- Class components still work. Do not use them in new code. Error boundaries are the one case that still needs a class.
- Keep components small. Each component must have one clear job.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

## 5. Props

- Props are the inputs of a component. The parent gives them to the child.
- Props are read-only. A child must not change its props.
- Data flows one way: from parent to child. This is one-way data flow.
- You can pass any value as a prop: strings, numbers, objects, arrays, functions, and JSX.
- `children` is a special prop. It holds the JSX placed between the opening and closing tags.
- You can set default values with default parameters: `function Button({ size = 'md' })`.
- Use the spread syntax to pass many props: `<Button {...props} />`. Use it with care. It can hide which props a component needs.
- To send data from child to parent, the parent passes a function as a prop. The child calls it.

## 6. State

- State is data that a component remembers between renders.
- Use `useState` to add state to a component.
- A normal variable does not work as state. Two reasons: it resets on each render, and a change does not start a new render.
- The setter function does two things: it saves the new value, and it asks React to render again.

```jsx
const [count, setCount] = useState(0);
```

### Key rules about state

- State is a snapshot. In one render, the value of state does not change. Even after you call the setter, the variable keeps its old value until the next render.
- Update state with a function when the new value depends on the old value:

```jsx
setCount(c => c + 1);
```

- Do not change state objects or arrays directly. Make a new copy. React uses a reference check (`Object.is`) to find a change.

```jsx
// Wrong
user.name = 'Sam';
setUser(user);

// Correct
setUser({ ...user, name: 'Sam' });
```

- For arrays, use methods that return a new array: `map`, `filter`, `slice`, and the spread syntax. Do not use `push`, `splice`, or `sort` on state directly.
- React batches state updates in one event. It does one render for many updates. In React 18 and later, batching also works in timeouts, promises, and native events.
- Do not store values in state if you can calculate them from other state or props. This is derived data. Calculate it during render.
- Keep state small and in the nearest common parent that needs it.
- Use lazy initial state for costly start values: `useState(() => compute())`. React calls the function only on the first render.

## 7. Events

- Pass a function to an event prop: `onClick={handleClick}`.
- Do not call the function in JSX. `onClick={handleClick()}` runs it during render. Write `onClick={handleClick}` or `onClick={() => handleClick(id)}`.
- React gives the handler a synthetic event. It wraps the browser event and works the same in all browsers.
- `e.stopPropagation()` stops the event from going up to parent elements.
- `e.preventDefault()` stops the default browser action, for example a form submit.
- Event handlers can have side effects. They do not need to be pure.
- Name handlers with `handle` and props with `on`: `onSave={handleSave}`.

## 8. Conditional rendering

- Use `if` statements before the return.
- Use the ternary operator in JSX: `{isOn ? <A /> : <B />}`.
- Use `&&` to show something or nothing: `{items.length > 0 && <List />}`.
- Be careful with `&&` and numbers. `{0 && <List />}` shows `0` on the screen. Use `{count > 0 && ...}`.
- A component can return `null` to show nothing.

## 9. Lists and keys

- Use `map` to render a list.
- Each item in a list needs a `key` prop. The key must be unique among siblings.
- React uses keys to match items between renders. This keeps state with the correct item.
- Use a stable ID from your data, such as a database ID.
- Do not use the array index as the key if the list can change order, or if items can be added or removed. This causes wrong state and wrong DOM updates.
- Do not use `Math.random()` as a key. A new key each render makes React recreate every item.
- `key` is not a prop. The child component cannot read it.
- You can use `key` to reset state on purpose. When the key changes, React makes a new instance of the component.

```jsx
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```
