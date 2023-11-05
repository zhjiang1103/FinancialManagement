--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4 (Homebrew)

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
-- Name: fav; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.fav (
    id integer NOT NULL,
    user_email character varying(255),
    movie_id integer
);


ALTER TABLE public.fav OWNER TO tpl1222_1;

--
-- Name: fav_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.fav_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fav_id_seq OWNER TO tpl1222_1;

--
-- Name: fav_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.fav_id_seq OWNED BY public.fav.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    name character varying(255),
    api_id integer
);


ALTER TABLE public.movies OWNER TO tpl1222_1;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO tpl1222_1;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    lastname character varying(255),
    firstname character varying(255),
    email character varying(255)
);


ALTER TABLE public.users OWNER TO tpl1222_1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl1222_1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: fav id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.fav ALTER COLUMN id SET DEFAULT nextval('public.fav_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: fav; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.fav (id, user_email, movie_id) FROM stdin;
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.movies (id, name, api_id) FROM stdin;
1	Saw X	951491
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.users (id, lastname, firstname, email) FROM stdin;
1	Wong	Steven	stevenWong@gmail.com
4	Jiang	Janet	janetjiang1103@gmail.com
\.


--
-- Name: fav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.fav_id_seq', 1, false);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.movies_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: fav fav_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fav_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

