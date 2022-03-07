<h1 align="center" style="font-weight: bold">
    kv-storage
</h1>

<!-- Description. Preferrably 1 sentence long. -->
<h3 align="center" style="font-weight: bold">
    Cloudflare KV API
</h3>

---

<h4 align="center">
A API to use the Cloudflare KV stoarge for easy and quick use to store Key-Value
</h4>

---

## **Important**

Got the idea thanks to [Whinee](https://github.com/whinee) with her orginal project [kv](https://github.com/whinee/kv) in plain Javascript

I wrote my own KV API in Typescript and my own, easy to use routing class

## **Usage**


### Read

> **GET** `/v/{key}`

**Response/s**:

<details>
	<summary>Success Response</summary>
	<p>
		<p><b>Code: </b><code>200 Ok.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>{value}</code></pre>
</details>

<details>
	<summary>Error Response</summary>
	<p>
		<p><b>Code: </b><code>404 Not Found.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code></code></pre>
</details>

### Create

> **POST** `/v/{key}`

|  header | content |
| :---: | :---: |
| Content-Type | application/json |
| Authorization | Basic &lt;credentials> |

**Data constraints:**
```json
{
	"value": "[your value for the key]"	
}
```
	
**Data Example:**
```json
{
	"value": "someData"
}
```

**Response/s**:

<details>
	<summary>Success Response</summary>
	<p>
		<p><b>Code: </b><code>200 Ok.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Got created: {key}</code></pre>
</details>

<details>
	<summary>Error Response</summary>
	<p>
		<p><b>Code: </b><code>401 Unauthorized.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Authorization needed</code></pre>
	<p>
		<p><b>Code: </b><code>409 Conflict.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>{key} already exists</code></pre>
</details>

### Update

> **PUT** `/v/{key}`

|  header | content |
| :---: | :---: |
| Content-Type | application/json |
| Authorization | Basic &lt;credentials> |

**Data constraints:**
```json
{
	"value": "[your value for the key]"	
}
```
	
**Data Example:**
```json
{
	"value": "someData"
}
```

**Response/s**:

<details>
	<summary>Success Response</summary>
	<p>
		<p><b>Code: </b><code>200 Ok.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Got updated: {key}</code></pre>
</details>

<details>
	<summary>Error Response</summary>
	<p>
		<p><b>Code: </b><code>401 Unauthorized.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Authorization needed</code></pre>
	<p>
		<p><b>Code: </b><code>404 Not Found.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>{key} does not exist</code></pre>
</details>

### Delete

> **Delete** `/v/{key}`

|  header | content |
| :---: | :---: |
| Authorization | Basic &lt;credentials> |

**Response/s**:

<details>
	<summary>Success Response</summary>
	<p>
		<p><b>Code: </b><code>200 Ok.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Got deleted: {key}</code></pre>
</details>

<details>
	<summary>Error Response</summary>
	<p>
		<p><b>Code: </b><code>401 Unauthorized.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>Authorization needed</code></pre>
	<p>
		<p><b>Code: </b><code>404 Not Found.</code></p>
	</p>
	<h3>Content</h3>
	<pre><code>{key} does not exist</code></pre>
</details>

## **Getting Started**

Go to [kv](https://github.com/whinee/kv) from [Whinee](https://github.com/whinee) to find out how to setup a Cloudflare Worker poject with KV ;)
