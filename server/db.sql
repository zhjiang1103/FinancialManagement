--
-- PostgreSQL database dump
-- pg_dump -U tpl1222_1 -d book -f db.sql

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: books; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.books (
    book_id integer NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    img_url character varying(500),
    category character varying(255)
);


ALTER TABLE public.books OWNER TO tpl1222_1;

--
-- Name: books_book_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_book_id_seq OWNER TO tpl1222_1;

--
-- Name: books_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;


--
-- Name: feeds; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.feeds (
    feed_id integer NOT NULL,
    api_id character varying(255) NOT NULL,
    user_id integer,
    isfavorite boolean DEFAULT false,
    shelf_status integer,
    CONSTRAINT feeds_shelf_status_check CHECK ((shelf_status = ANY (ARRAY[0, 1, 2])))
);


ALTER TABLE public.feeds OWNER TO tpl1222_1;

--
-- Name: feeds_feed_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.feeds_feed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feeds_feed_id_seq OWNER TO tpl1222_1;

--
-- Name: feeds_feed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.feeds_feed_id_seq OWNED BY public.feeds.feed_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO tpl1222_1;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO tpl1222_1;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: books book_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);


--
-- Name: feeds feed_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.feeds ALTER COLUMN feed_id SET DEFAULT nextval('public.feeds_feed_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.books (book_id, title, author, img_url, category) FROM stdin;
\.


--
-- Data for Name: feeds; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.feeds (feed_id, api_id, user_id, isfavorite, shelf_status) FROM stdin;
3	uefwmdROKTAC	1	\N	\N
2	5yAsEAAAQBAJ	1	\N	1
4	TX5KCAAAQBAJ	1	\N	1
1	2O0QDQAAQBAJ	1	\N	0
5	5K7uDwAAQBAJ	1	f	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.users (user_id, first_name, last_name, email) FROM stdin;
1	Janet	Jiang	janetjiang1103@gmail.com
\.


--
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.books_book_id_seq', 1, false);


--
-- Name: feeds_feed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.feeds_feed_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);


--
-- Name: feeds feeds_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.feeds
    ADD CONSTRAINT feeds_pkey PRIMARY KEY (feed_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: feeds feeds_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.feeds
    ADD CONSTRAINT feeds_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

