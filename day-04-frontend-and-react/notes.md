
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

## 10. Forms and inputs

### Controlled input

- React controls the value. State holds the value. An `onChange` handler updates the state.

```jsx
<input value={text} onChange={e => setText(e.target.value)} />
```

- If you set `value` and do not set `onChange`, the input is read-only. React shows a warning.
- For a checkbox, use `checked` and `e.target.checked`.
- Use `value={undefined}` carefully. A change from uncontrolled to controlled gives a warning. Start with an empty string.

### Uncontrolled input

- The DOM keeps the value. You read it with a ref or with `FormData` when the form submits.
- Use `defaultValue` for the start value.
- Uncontrolled inputs are simpler for basic forms. Controlled inputs are better when you need live validation or live display.

### Form submit

- Use the `onSubmit` handler on the `<form>` element. Call `e.preventDefault()`.
- In React 19, you can pass a function to the `action` prop of a form. See section 22.
- For large forms, use a library such as React Hook Form. It reduces re-renders.

## 11. Rendering: how React updates the screen

React does three steps:

1. **Trigger.** A render starts for the first render, or when state changes.
2. **Render.** React calls your components to find what the UI must look like.
3. **Commit.** React changes the DOM. It changes only what is different.

- A render is not the same as a DOM update. A component can render and cause no DOM change.
- When a parent renders, all its children render too. This is the default. The props do not need to change.
- The browser paints after the commit.

### Virtual DOM and reconciliation

- React keeps a tree of objects that describes the UI. This is the virtual DOM.
- After a state change, React makes a new tree. It compares the new tree with the old tree. This is the diffing process.
- Two rules guide the comparison:
  - Elements of different types make different trees. React removes the old tree and builds a new one.
  - Keys identify which items in a list stay the same.
- If a component stays at the same position in the tree with the same type, React keeps its state.
- If the type or position changes, React resets the state.

### Fiber

- Fiber is the internal engine of React. It splits render work into small units.
- This lets React pause, continue, or stop a render. It is the basis for concurrent features such as `useTransition`.

## 12. Hooks: the rules

- Hooks are functions that start with `use`. They let a function component use React features.
- Rule 1: Call hooks only at the top level of a component or custom hook. Do not call them in loops, conditions, or nested functions.
- Rule 2: Call hooks only from React function components or custom hooks.
- React tracks hooks by their call order. If the order changes between renders, state goes to the wrong hook.
- Use the ESLint plugin `eslint-plugin-react-hooks`. It finds these errors.

## 13. useState

See section 6. Summary:

- Returns `[value, setValue]`.
- The setter accepts a value or an updater function.
- If the new value is the same as the old value (`Object.is`), React skips the render.

## 14. useEffect

- `useEffect` runs code after React commits to the DOM. Use it to synchronize a component with an external system.
- Examples of external systems: a server connection, a browser API, a timer, a third-party widget.
- Do not use an effect to change state from other state. Calculate the value during render. Do not use an effect to handle a user event. Use an event handler.

```jsx
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect(); // cleanup
}, [roomId]);
```

### The dependency array

- No array: the effect runs after every render.
- Empty array `[]`: the effect runs after the first render only.
- Array with values: the effect runs after the first render, and again when a value changes.
- Include every reactive value that the effect reads. Reactive values are props, state, and variables you define inside the component.
- Do not remove a dependency to stop an effect from running. Fix the code instead.

### Cleanup

- The cleanup function runs before the next effect, and when the component unmounts.
- Use cleanup to stop timers, remove event listeners, close connections, and cancel requests.

### Strict Mode

- In development, Strict Mode runs each effect, its cleanup, and the effect again. This is to find missing cleanup code.
- It does not happen in production.
- If you see a double effect, do not remove Strict Mode. Add the cleanup.

### Fetch data in an effect

- Use an ignore flag or `AbortController` to prevent race conditions. A slow old response must not replace a new response.

```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => { if (err.name !== 'AbortError') setError(err); });
  return () => controller.abort();
}, [url]);
```

- For real projects, use a data library such as TanStack Query or SWR, or the data tools of your framework. They handle caching, retries, and race conditions.

### Effect events

- `useEffectEvent` (React 19.2) lets you read the latest props or state inside an effect without making them dependencies. Use it for code that is an event and not a synchronization.

## 15. useRef

- `useRef` returns an object: `{ current: value }`.
- React keeps the same object between renders.
- A change to `ref.current` does not cause a render.
- Do not read or write `ref.current` during render. Do it in event handlers and effects.
- Use case 1: get a DOM element.

```jsx
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();
```

- Use case 2: keep a value that must not trigger a render, such as a timer ID or a previous value.
- In React 19, a function component can receive `ref` as a normal prop. `forwardRef` is no longer necessary for new code.
- Use `useImperativeHandle` to show only some methods to a parent through a ref. Use it rarely.

## 16. useContext

- Context passes data deep in the tree without props at each level. This prevents prop drilling.
- Three steps: create the context, provide a value, read the value.

```jsx
const ThemeContext = createContext('light');

<ThemeContext value="dark">   {/* React 19: use the context as the provider */}
  <Page />
</ThemeContext>

const theme = useContext(ThemeContext);
```

- In React 18 and earlier, use `<ThemeContext.Provider value="dark">`.
- When the context value changes, all components that read it render again.
- If you pass a new object as the value on each render, all consumers render each time. Use `useMemo` for the value, or split the context into smaller parts.
- Context is good for theme, language, and the current user. It is not a full state manager for data that changes often.

## 17. useReducer

- `useReducer` is an alternative to `useState` for complex state logic.
- A reducer is a pure function: `(state, action) => newState`.
- You call `dispatch(action)` to send an action. The reducer returns the new state.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'added': return [...state, action.item];
    case 'removed': return state.filter(i => i.id !== action.id);
    default: throw new Error('Unknown action');
  }
}
const [items, dispatch] = useReducer(reducer, []);
```

- Use it when many event handlers change the same state, or when the next state depends on complex rules.
- Combine `useReducer` with context to share state and `dispatch` in a large part of the app.

## 18. useMemo and useCallback

- `useMemo(fn, deps)` keeps the result of a calculation between renders. It recalculates only if a dependency changes.
- `useCallback(fn, deps)` keeps a function between renders. It is the same as `useMemo(() => fn, deps)`.
- They are performance tools. Your code must work correctly without them.
- Use them in these cases:
  - The calculation is slow, and you measured it.
  - You pass the value to a component wrapped in `memo`.
  - The value is a dependency of another hook.
- Do not add them to everything. They cost memory and make code harder to read.
- The React Compiler can add this memoization for you. See section 27.

## 19. memo

- `memo(Component)` makes React skip a render if the props are the same as before. React compares each prop with `Object.is`.
- Objects, arrays, and functions made in a parent are new on each render. They break `memo` unless you keep them with `useMemo` or `useCallback`.
- `memo` does not stop a render that state or context starts inside the component.
- A better first step: move state down, or pass `children`. This often removes the need for `memo`.

## 20. Other hooks

- `useLayoutEffect`: runs after the DOM change and before the browser paints. Use it to measure the layout and change the DOM before the user sees it. It can block painting. Use `useEffect` if you can.
- `useId`: makes a unique ID that is the same on server and client. Use it for `htmlFor` and `aria-*` attributes. Do not use it for list keys.
- `useTransition`: marks a state update as not urgent. The UI stays responsive. It gives `isPending` for a loading state.
- `useDeferredValue`: gives a late copy of a value. The UI shows the old value while the new value renders in the background.
- `useSyncExternalStore`: reads data from an external store in a safe way. State libraries use it.
- `useDebugValue`: shows a label for a custom hook in React DevTools.
- `useInsertionEffect`: for CSS-in-JS libraries. Most developers do not need it.

## 21. Custom hooks

- A custom hook is a function that starts with `use` and calls other hooks.
- It shares logic between components. It does not share state. Each call makes its own state.

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return isOnline;
}
```

- Give a custom hook one clear purpose. Name it for what it does, for example `useDebounce`, `useLocalStorage`, `useFetch`.
